import { USER_ROLE_MAP, type UserStatus } from "@/entities/user/types";
import { USER_TABLE_KEYS } from "@/features/manage-user/constants/user-table-keys";
import type { UseFilterUserReturn } from "@/features/manage-user/model/useFilterUser";
import { useManageUserTable } from "@/features/manage-user/model/useManageUserTable";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { parseStudentId } from "@/shared/utils/parse-student-id";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Table } from "@b1nd/dodam-design-system/components";
import {
  CheckmarkCircleFill,
  Clock,
  XmarkCircle,
} from "@b1nd/dodam-design-system/icons";

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

  const getStatusIcon = (status: UserStatus) => {
    return status === "ACTIVE" ? <CheckmarkCircleFill color={colors.status.success}/> 
    : status === "DEACTIVE" ? <XmarkCircle /> 
    : status === "PENDING" ? <Clock /> : <></>;
  }

  const rows = users.map((item) => {
    const student = item.student;
    const teacher = item.teacher;
    return [
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

  return (
    <div className="overflow-x-auto flex-1 overflow-scroll min-h-0 scrollbar">
      <Table data={rows} keys={USER_TABLE_KEYS} />
      {isFetchingNextPage ? (
        <div className="mt-3 flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-12 w-full rounded-medium skeleton" />
          ))}
        </div>
      ) : null}
      <div ref={ref} />
    </div>
  );
};

export default ManageUserTable;
