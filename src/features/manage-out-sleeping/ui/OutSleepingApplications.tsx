import { useGetOutSleepingApplications } from "@/entities/out-sleeping/queries";
import { padDate } from "@/shared/utils/pad-date";
import { parseDate } from "@/shared/utils/parse-date";
import { Table } from "@b1nd/dodam-design-system/components";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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

  const keys: [string, string][] = [
    ["이름", "80px"],
    ["학번", "80px"],
    ["기간", "160px"],
    ["사유", "FULL"],
    ["상태", "280px"],
  ];

  const rows = applications.map((app) => {
    const { grade, room, number } = app.student;
    const studentId = `${grade}${String(room).padStart(2, "0")}${String(number).padStart(2, "0")}`;
    const period = `${parseDate(app.startAt)} ~ ${parseDate(app.endAt)}`;
    const statusLabel =
      app.status === "PENDING"
        ? "대기중"
        : app.status === "ALLOWED"
          ? "승인됨"
          : "거절됨";

    return [app.student.name, studentId, period, app.reason, statusLabel];
  });

  return (
    <div className="flex flex-col overflow-y-auto grow">
      <Table keys={keys} data={rows} />
      <div ref={ref} />
    </div>
  );
};

export default OutSleepingApplications;
