import type { NightStudyStatus, ProjectNightStudyApplication } from "@/entities/night-study/types";
import { parseDate } from "@/shared/utils/parse-date";
import { Table, useOverlay } from "@b1nd/dodam-design-system/components";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { useState } from "react";
import { PROJECT_TABLE_KEYS } from "../constants/project-table-keys";
import { useProjectApplicationsTable } from "../hooks/useProjectApplicationsTable";
import ProjectActionCell from "./ProjectActionCell";
import ProjectInfoDialog from "./ProjectInfoDialog";
import ProjectSkeletonRows from "./ProjectSkeletonRows";
import RejectDialog from "./RejectDialog";
import RoomAssignmentModal from "./RoomAssignmentModal";
import { colors } from "@b1nd/dodam-design-system/colors";

const STATUS_LABEL: Record<NightStudyStatus, string> = {
  PENDING: "대기중",
  ALLOWED: "승인",
  REJECTED: "거절",
};

const STATUS_COLOR: Record<NightStudyStatus, string> = {
  PENDING: colors.text.secondary,
  ALLOWED: colors.status.success,
  REJECTED: colors.status.error,
};

const ProjectApplicationsTable = () => {
  const { open } = useOverlay();
  const [keyword, setKeyword] = useState("");
  const {
    filtered: all,
    ref,
    isFetchingNextPage,
    allow,
    isAllowing,
    reject,
    isRejecting,
    pending,
    isPendingRevert,
  } = useProjectApplicationsTable();

  const filtered = keyword.trim()
    ? all.filter((a) => a.name.includes(keyword.trim()))
    : all;

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
    <span style={{ color: STATUS_COLOR[app.status] }}>{STATUS_LABEL[app.status]}</span>,
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
    <div className="flex flex-col gap-3 overflow-y-auto grow items-start">
      <div className="flex items-center gap-3 h-12 bg-fill-primary rounded-small px-3">
        <MagnifyingGlass size={24} color={colors.text.placeholder} />
        <input
          className="flex-1 bg-transparent outline-none text-headline text-text-primary placeholder:text-text-placeholder"
          placeholder="검색어를 입력하세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center grow text-text-secondary text-body1">
          신청 내역이 없습니다.
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="min-w-sm">
            <Table keys={PROJECT_TABLE_KEYS} data={rows} />
            {isFetchingNextPage && <ProjectSkeletonRows count={3} />}
            <div ref={ref} />
          </div>
        </div>
      )}
    </div>
  );
};


ProjectApplicationsTable.Skeleton = () => (
  <div className="overflow-x-auto">
    <div className="min-w-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {PROJECT_TABLE_KEYS.map(([label, width], i) => (
              <th
                key={`${label}-${i}`}
                className="text-left px-3 text-text-secondary border-t border-border-normal"
                style={{ height: 32, width: width === "FULL" ? undefined : width }}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <ProjectSkeletonRows count={8} />
    </div>
  </div>
);

export default ProjectApplicationsTable;
