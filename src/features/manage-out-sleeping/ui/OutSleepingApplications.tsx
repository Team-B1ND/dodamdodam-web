import { useGetOutSleepingApplications } from "@/entities/out-sleeping/queries";
import { padDate } from "@/shared/utils/pad-date";
import { parseDate } from "@/shared/utils/parse-date";
import { Table, useOverlay } from "@b1nd/dodam-design-system/components";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OutSleepingActionCell from "./OutSleepingActionCell";
import OutSleepingSkeletonRows from "./OutSleepingSkeletonRows";
import { MOBILE_TABLE_KEYS, TABLE_KEYS } from "@/features/manage-out-sleeping/constants/table-keys";
import { colors } from "@b1nd/dodam-design-system/colors";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { CheckmarkCircleFill, Clock, XmarkCircle } from "@b1nd/dodam-design-system/icons";
import OutSleepingApplicationsModal from "@/features/manage-out-sleeping/ui/OutSleepingApplicationsModal";

interface Props {
  date: Date;
}

const OutSleepingApplications = ({ date }: Props) => {
  const isMobile = useIsMobile();
  const overlay = useOverlay();
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
    const statusIcon =
      app.status === "PENDING"
        ? <Clock color={colors.status.warning} />
        : app.status === "ALLOWED"
          ? <CheckmarkCircleFill color={colors.status.success} />
          : <XmarkCircle color={colors.status.error} />;

    return isMobile ? ([
      app.student.name,
      statusIcon,
      period,
    ]) : ([
      app.student.name,
      studentId,
      period,
      app.reason,
      statusIcon,
      <OutSleepingActionCell
        key={app.publicId}
        publicId={app.publicId}
        status={app.status}
      />,
    ]);
  });

  const openModal = (idx: number) => {
    overlay.open(({ close, exit, setDimClickHandler }) => {
      const onClose = () => {
        close();
        exit();
      };
      setDimClickHandler(onClose);

      const selectApp = applications[idx];

      const { grade, room, number } = selectApp.student;
      const studentId = `${grade}${room}${String(number).padStart(2, "0")}`;
      
      return (
        <OutSleepingApplicationsModal
          publicId={selectApp.publicId}
          name={selectApp.student.name}
          studentId={studentId}
          startDate={parseDate(selectApp.startAt)}
          endDate={parseDate(selectApp.endAt)}
          reason={selectApp.reason}
          onClose={onClose}
        />
      );
    })
  }

  return (
    <div className="flex flex-col overflow-y-auto grow">
      <div className="overflow-x-auto">
        <div className="sm:min-w-174">
          <Table onRowClick={isMobile ? openModal : undefined} keys={isMobile ? MOBILE_TABLE_KEYS : TABLE_KEYS} data={rows} />
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
