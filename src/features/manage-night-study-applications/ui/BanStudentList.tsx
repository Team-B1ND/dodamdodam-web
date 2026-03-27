import type { User } from "@/entities/user/types";
import { Table, useOverlay } from "@b1nd/dodam-design-system/components";
import { BAN_TABLE_KEYS } from "../constants/ban-table-keys";
import { useBanManagementTable } from "../hooks/useBanManagementTable";
import BanActionCell from "./BanActionCell";
import BanDialog from "./BanDialog";
import BanSkeletonRows from "./BanSkeletonRows";

interface Props {
  keyword: string;
}

const BanStudentList = ({ keyword }: Props) => {
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
      <div className="flex items-center justify-center grow text-text-secondary text-body1">
        학생을 찾을 수 없습니다.
      </div>
    );
  }

  const rows = students.map((user: User) => {
    const ban = banMap.get(user.publicId) ?? null;
    const studentId = user.student
      ? `${user.student.grade}${user.student.room}${String(user.student.number).padStart(2, "0")}`
      : "-";

    return [
      user.name,
      studentId,
      user.phone ?? "-",
      "",
      <BanActionCell
        isBanned={ban !== null}
        onBan={() => openBanDialog(user)}
        onUnban={() => deleteBan(user.publicId)}
        isDeleting={isDeleting}
      />,
    ];
  });

  return (
    <>
      <Table keys={BAN_TABLE_KEYS} data={rows} />
      {isFetchingNextPage && <BanSkeletonRows count={3} />}
      <div ref={ref} />
    </>
  );
};

export default BanStudentList;
