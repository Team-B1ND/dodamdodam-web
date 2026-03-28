import type { ApplicationTableFilters, ProjectNightStudyApplication } from "@/entities/night-study/types";
import { parseDate } from "@/shared/utils/parse-date";
import { Table, useOverlay } from "@b1nd/dodam-design-system/components";
import { NIGHT_STUDY_STATUS_COLOR, NIGHT_STUDY_STATUS_LABEL } from "../constants/night-study-status";
import { PROJECT_TABLE_KEYS } from "../constants/project-table-keys";
import { useProjectApplicationsTable } from "../hooks/useProjectApplicationsTable";
import ProjectActionCell from "./ProjectActionCell";
import ProjectInfoDialog from "./ProjectInfoDialog";
import ProjectSkeletonRows from "./ProjectSkeletonRows";
import RejectDialog from "./RejectDialog";
import RoomAssignmentModal from "./RoomAssignmentModal";

const ProjectTableData = (filters: ApplicationTableFilters) => {
  const { open } = useOverlay();
  const {
    filtered,
    ref,
    isFetchingNextPage,
    allow,
    isAllowing,
    reject,
    isRejecting,
    pending,
    isPendingRevert,
  } = useProjectApplicationsTable(filters);

  const openInfoDialog = (app: ProjectNightStudyApplication) => {
    open(({ close, exit, isOpen }) => (
      <ProjectInfoDialog
        application={app}
        isOpen={isOpen}
        onClose={() => { close(); exit(); }}
      />
    ));
  };

  const openRejectDialog = (appId: string) => {
    open(({ close, exit, isOpen }) => (
      <RejectDialog
        isOpen={isOpen}
        isPending={isRejecting}
        onClose={() => { close(); exit(); }}
        onConfirm={(reason) => {
          reject(
            { id: appId, rejectionReason: reason },
            { onSettled: () => { close(); exit(); } },
          );
        }}
      />
    ));
  };

  const openRoomDialog = (app: ProjectNightStudyApplication) => {
    open(({ close, exit, isOpen }) => (
      <RoomAssignmentModal
        application={app}
        isOpen={isOpen}
        onClose={() => { close(); exit(); }}
      />
    ));
  };

  if (filtered.length === 0) {
    return (
      <div className="w-full flex items-start justify-center grow text-text-secondary text-body1">
        신청 내역이 없습니다.
      </div>
    );
  }

  const rows = filtered.map((app: ProjectNightStudyApplication) => [
    <button
      className="text-primary-normal font-medium hover:underline text-left"
      onClick={() => openInfoDialog(app)}
    >
      {app.name}
    </button>,
    <p className="truncate max-w-xs text-text-secondary">{app.description}</p>,
    `${app.period}교시`,
    app.room?.name ?? "-",
    parseDate(app.startAt),
    parseDate(app.endAt),
    <span style={{ color: NIGHT_STUDY_STATUS_COLOR[app.status] }}>{NIGHT_STUDY_STATUS_LABEL[app.status]}</span>,
    <ProjectActionCell
      status={app.status}
      onAllow={() => allow(app.id)}
      onReject={() => openRejectDialog(app.id)}
      onPending={() => pending(app.id)}
      onAssignRoom={() => openRoomDialog(app)}
      isAllowing={isAllowing}
      isPendingRevert={isPendingRevert}
    />,
  ]);

  return (
    <div className="flex-1 min-h-0 min-w-0 overflow-x-scroll scrollbar">
      <div className="min-w-sm">
        <Table keys={PROJECT_TABLE_KEYS} data={rows} />
        {isFetchingNextPage && <ProjectSkeletonRows count={3} />}
        <div ref={ref} />
      </div>
    </div>
  );
};

export default ProjectTableData;
