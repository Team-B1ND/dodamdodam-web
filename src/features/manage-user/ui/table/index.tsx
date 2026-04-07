import { USER_ROLE_MAP, type UserStatus } from "@/entities/user/types";
import { USER_TABLE_KEYS } from "@/features/manage-user/constants/user-table-keys";
import type { UseFilterUserReturn } from "@/features/manage-user/model/useFilterUser";
import { useManageUserTable } from "@/features/manage-user/model/useManageUserTable";
import { useUserStatusControl } from "@/features/manage-user/model/useUserStatusControl";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { parseStudentId } from "@/shared/utils/parse-student-id";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Checkbox, FilledButton, Table } from "@b1nd/dodam-design-system/components";
import {
  CheckmarkCircleFill,
  Clock,
  XmarkCircle,
} from "@b1nd/dodam-design-system/icons";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ManageUserTable = ({
  keyword,
  selectedStatus,
  roles,
  generationOnly,
}: Pick<
  UseFilterUserReturn,
  "keyword" | "selectedStatus" | "roles" | "generationOnly"
>) => {
  const { users, ref, isFetchingNextPage } = useManageUserTable({
    keyword,
    selectedStatus,
    roles,
    generationOnly,
  });
  const {
    selectedIds,
    isAllSelected,
    isPending,
    hasSelectedNonPendingUser,
    toggleAll,
    toggleOne,
    handleBulkEnable,
  } = useUserStatusControl(users);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const getStatusIcon = (status: UserStatus) => {
    return status === "ACTIVE" ? <CheckmarkCircleFill color={colors.status.success}/> 
    : status === "DEACTIVE" ? <XmarkCircle /> 
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

  useEffect(() => {
    const element = scrollContainerRef.current;

    if (!element) return;

    setIsScrollable(element.scrollHeight > element.clientHeight);
  }, [rows.length, isFetchingNextPage, selectedIds.size]);

  return (
    <>
      {selectedIds.size > 0 ? (
        <div className="flex items-center gap-2 self-start">
          <FilledButton
            role="primary"
            size="small"
            display="inline"
            disabled={isPending || hasSelectedNonPendingUser}
            onClick={handleBulkEnable}
          >
            일괄 승인
          </FilledButton>
        </div>
      ) : null}
      <div
        ref={scrollContainerRef}
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
        {isScrollable ? <div ref={ref} /> : null}
      </div>
    </>
  );
};

export default ManageUserTable;
