import { USER_ROLE_MAP, type UserStatus } from "@/entities/user/types";
import { USER_TABLE_KEYS } from "@/features/manage-user/constants/user-table-keys";
import type { UseFilterUserReturn } from "@/features/manage-user/model/useFilterUser";
import { useManageUserTable } from "@/features/manage-user/model/useManageUserTable";
import { useUserStatusControl } from "@/features/manage-user/model/useUserStatusControl";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { parseStudentId } from "@/shared/utils/parse-student-id";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  Checkbox,
  Dialog,
  FilledButton,
  Table,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import {
  CheckmarkCircleFill,
  Clock,
} from "@b1nd/dodam-design-system/icons";
import { type ReactNode } from "react";

const ManageUserTable = ({
  keyword,
  selectedStatus,
  roles,
  generationOnly,
}: Pick<
  UseFilterUserReturn,
  "keyword" | "selectedStatus" | "roles" | "generationOnly"
>) => {
  const { open } = useOverlay();
  const { users, ref, hasNextPage, isFetchingNextPage } = useManageUserTable({
    keyword,
    selectedStatus,
    roles,
    generationOnly,
  });
  const {
    selectedIds,
    isAllSelected,
    isEnabling,
    isDeactivating,
    hasSelectedNonPendingUser,
    hasSelectedDeactiveUser,
    toggleAll,
    toggleOne,
    handleBulkEnable,
    handleBulkDeactivate,
  } = useUserStatusControl(users);

  const getStatusIcon = (status: UserStatus) => {
    return status === "ACTIVE" ? <CheckmarkCircleFill color={colors.status.success}/> 
    : status === "PENDING" ? <Clock /> : <></>;
  }

  const tableKeys: [ReactNode, string][] = [
    [
      <Checkbox
        selected={isAllSelected}
        onClick={() => toggleAll(users.map((user) => user.publicId))}
        size="small"
      />,
      "40px",
    ],
    ...USER_TABLE_KEYS,
  ];

  const rows = users.map((item) => {
    const student = item.student;
    const teacher = item.teacher;
    return [
      <Checkbox
        selected={selectedIds.has(item.publicId)}
        onClick={() => toggleOne(item.publicId)}
        size="small"
      />,
      getStatusIcon(item.status),
      item.name,
      student
        ? student.isGraduated
          ? "졸업생"
          : parseStudentId(student.grade, student.room, student.number)
        : "-",
      teacher ? teacher.position : "-",
      formatPhoneNumber(item.phone),
      item.roles.map(item => USER_ROLE_MAP[item]).join(", ")
    ];
  });

  const handleOpenBulkDeactivateDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title="정말 일괄 비활성화할까요?"
        description="선택한 유저들을 비활성화 상태로 변경해요."
      >
        <Dialog.FilledButton
          role="assistive"
          disabled={isDeactivating}
          onClick={() => {
            close();
            exit();
          }}
        >
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          role="negative"
          disabled={isDeactivating}
          onClick={() => {
            handleBulkDeactivate();
            close();
            exit();
          }}
        >
          비활성화
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return (
    <>
      {selectedIds.size > 0 ? (
        <div className="flex items-center gap-2 self-start">
          <FilledButton
            role="primary"
            size="small"
            display="inline"
            disabled={isEnabling || hasSelectedNonPendingUser}
            onClick={handleBulkEnable}
          >
            일괄 승인
          </FilledButton>
          <FilledButton
            role="negative"
            size="small"
            display="inline"
            disabled={isDeactivating || hasSelectedDeactiveUser}
            onClick={handleOpenBulkDeactivateDialog}
          >
            일괄 비활성화
          </FilledButton>
        </div>
      ) : null}
      <div
        className="overflow-x-auto flex-1 overflow-scroll min-h-0 scrollbar"
      >
        <Table data={rows} keys={tableKeys} />
        {isFetchingNextPage ? (
          <div className="mt-3 flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-12 w-full rounded-medium skeleton" />
            ))}
          </div>
        ) : null}
        {hasNextPage ? <div ref={ref} className="h-2 shrink-0" /> : null}
      </div>
    </>
  );
};

export default ManageUserTable;
