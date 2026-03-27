import { useGetOutSleepingApplications } from "@/entities/out-sleeping/queries";
import { padDate } from "@/shared/utils/pad-date";
import { parseDate } from "@/shared/utils/parse-date";
import { Table } from "@b1nd/dodam-design-system/components";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OutSleepingActionCell from "./OutSleepingActionCell";
import OutSleepingSkeletonRows from "./OutSleepingSkeletonRows";
import { TABLE_KEYS } from "@/features/manage-out-sleeping/constants/table-keys";
import { colors } from "@b1nd/dodam-design-system/colors";

interface Props {
  date: Date;
}

const OutSleepingApplications = ({ date }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetOutSleepingApplications(padDate(date));
  const applications = data.pages.flatMap((page) => page.data.content);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const rows = applications.map((app) => {
    const { grade, room, number } = app.student;
    const studentId = `${grade}${room}${String(number).padStart(2, "0")}`;
    const period = `${parseDate(app.startAt)} ~ ${parseDate(app.endAt)}`;
    const statusLabel =
      app.status === "PENDING"
        ? "대기중"
        : app.status === "ALLOWED"
          ? "승인됨"
          : "거절됨";

    return [
      app.student.name,
      studentId,
      period,
      app.reason,
      <p
        style={{
          color:
            app.status === "ALLOWED"
              ? colors.status.success
              : app.status === "DENIED"
                ? colors.status.error
                : colors.text.secondary,
        }}>
        {statusLabel}
      </p>,
      <OutSleepingActionCell
        key={app.publicId}
        publicId={app.publicId}
        status={app.status}
      />,
    ];
  });

  return (
    <div className="flex flex-col overflow-y-auto grow">
      <div className="overflow-x-auto">
        <div className="min-w-174">
          <Table keys={TABLE_KEYS} data={rows} />
          {isFetchingNextPage && <OutSleepingSkeletonRows count={3} />}
          <div ref={ref} />
        </div>
      </div>
    </div>
  );
};


OutSleepingApplications.Skeleton = () => (
  <div className="flex flex-col overflow-y-auto grow">
    <div className="overflow-x-auto">
      <div className="min-w-174">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {TABLE_KEYS.map(([label, width]) => (
                <th
                  key={label}
                  className="text-left px-3 text-text-secondary border-t border-border-normal"
                  style={{
                    height: 32,
                    width: width === "FULL" ? undefined : width,
                    minWidth: width === "FULL" ? 96 : width,
                  }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <OutSleepingSkeletonRows count={8} />
      </div>
    </div>
  </div>
);

export default OutSleepingApplications;
