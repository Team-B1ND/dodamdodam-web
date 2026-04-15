import type { User } from "@/entities/user/types";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { Table, useOverlay } from "@b1nd/dodam-design-system/components";
import {
  BAN_TABLE_KEYS,
  MOBILE_BAN_TABLE_KEYS,
} from "../constants/ban-table-keys";
import { useBanManagementTable } from "../hooks/useBanManagementTable";
import BanActionCell from "./BanActionCell";
import BanDialog from "./BanDialog";
import BanSkeletonRows from "./BanSkeletonRows";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";

interface Props {
  keyword: string;
}

const BanStudentList = ({ keyword }: Props) => {
  const isMobile = useIsMobile();
  const { open } = useOverlay();
  const {
    students,
    banMap,
    ref,
    isFetchingNextPage,
    createBan,
    isCreating,
    deleteBan,
    isDeleting,
  } = useBanManagementTable(keyword);

  const openBanDialog = (user: User) => {
    open(({ close, exit, isOpen }) => (
      <BanDialog
        studentName={user.name}
        isOpen={isOpen}
        isPending={isCreating}
        onClose={() => {
          close();
          exit();
        }}
        onConfirm={(reason, endAt) => {
          createBan(
            { userId: user.publicId, reason, endAt },
            {
              onSettled: () => {
                close();
                exit();
              },
            },
          );
        }}
      />
    ));
  };

  if (students.length === 0) {
    return (
      <div className="w-full flex items-start justify-center grow text-text-secondary text-body1">
        학생을 찾을 수 없습니다.
      </div>
    );
  }

  const rows = students.map((user: User) => {
    const ban = banMap.get(user.publicId) ?? null;
    const studentId = user.student
      ? `${user.student.grade}${user.student.room}${String(user.student.number).padStart(2, "0")}`
      : "-";
    const actionCell = (
      <BanActionCell
        isBanned={ban !== null}
        onBan={() => openBanDialog(user)}
        onUnban={() => deleteBan(user.publicId)}
        isDeleting={isDeleting}
      />
    );

    return isMobile
      ? [
          user.name,
          studentId,
          actionCell,
        ]
      : [
          user.name,
          studentId,
          formatPhoneNumber(user.phone) ?? "-",
          "",
          actionCell,
        ];
  });

  return (
    <>
      <Table keys={isMobile ? MOBILE_BAN_TABLE_KEYS : BAN_TABLE_KEYS} data={rows} />
      {isFetchingNextPage && <BanSkeletonRows count={3} />}
      <div ref={ref} />
    </>
  );
};

export default BanStudentList;
