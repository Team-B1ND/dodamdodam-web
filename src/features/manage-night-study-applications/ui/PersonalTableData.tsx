import type { ApplicationTableFilters, PersonalNightStudyApplication } from "@/entities/night-study/types";
import { parseDate } from "@/shared/utils/parse-date";
import { Checkbox, FilledButton, Table, useOverlay } from "@b1nd/dodam-design-system/components";
import type { ReactNode } from "react";
import { NIGHT_STUDY_STATUS_COLOR, NIGHT_STUDY_STATUS_LABEL } from "../constants/night-study-status";
import { PERSONAL_MOBILE_TABLE_KEYS, PERSONAL_TABLE_KEYS } from "../constants/personal-table-keys";
import { usePersonalApplicationsTable } from "../hooks/usePersonalApplicationsTable";
import PersonalActionCell from "./PersonalActionCell";
import PersonalInfoDialog from "./PersonalInfoDialog";
import PersonalSkeletonRows from "./PersonalSkeletonRows";
import RejectDialog from "./RejectDialog";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

const PersonalTableData = (filters: ApplicationTableFilters) => {
  const { open } = useOverlay();
  const isMobile = useIsMobile();
  const {
    filtered,
    selectedIds,
    toggleAll,
    toggleOne,
    ref,
    isFetchingNextPage,
    allow,
    isAllowing,
    reject,
    isRejecting,
    pending,
    isPendingRevert,
    handleBulkAllow,
    handleBulkReject,
  } = usePersonalApplicationsTable(filters);

  const filteredIds = filtered.map((a) => a.id);
  const isAllSelected = filtered.length > 0 && selectedIds.size === filtered.length;
  const hasSelectedAllowedApplication = filtered.some(
    (app) => selectedIds.has(app.id) && app.status === "ALLOWED",
  );

  const openInfoDialog = (app: PersonalNightStudyApplication) => {
    open(({ close, exit, isOpen }) => (
      <PersonalInfoDialog
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

  const openBulkRejectDialog = (ids: string[]) => {
    open(({ close, exit, isOpen }) => (
      <RejectDialog
        isOpen={isOpen}
        isPending={isRejecting}
        onClose={() => { close(); exit(); }}
        onConfirm={(reason) => {
          handleBulkReject(reason, ids, () => { close(); exit(); });
        }}
      />
    ));
  };

  if (filtered.length === 0) {
    return (
      <div className="w-full flex items-center justify-center grow text-text-secondary text-body1">
        신청 내역이 없습니다.
      </div>
    );
  }

  const tableKeys: [ReactNode, string][] = [
    [
      <Checkbox
        selected={isAllSelected}
        onClick={() => toggleAll(filteredIds)}
        size="small"
      />,
      "40px",
    ],
    ...(isMobile ? PERSONAL_MOBILE_TABLE_KEYS : PERSONAL_TABLE_KEYS),
  ];

  const rows = filtered.map((app: PersonalNightStudyApplication) => isMobile ? [
    <Checkbox
      selected={selectedIds.has(app.id)}
      onClick={() => toggleOne(app.id)}
      size="small"
    />,
    <button
      className="text-primary-normal font-medium hover:underline text-left"
      onClick={() => openInfoDialog(app)}
    >
      {app.leader.name}
    </button>,
    app.leader.student
      ? `${app.leader.student.grade}${app.leader.student.room}${String(app.leader.student.number).padStart(2, "0")}`
      : "-",
    <div className="shrink-0 whitespace-nowrap">
      <span style={{ color: NIGHT_STUDY_STATUS_COLOR[app.status] }}>
        {NIGHT_STUDY_STATUS_LABEL[app.status]}
      </span>
    </div>,
    <PersonalActionCell
      status={app.status}
      onAllow={() => allow(app.id)}
      onReject={() => openRejectDialog(app.id)}
      onPending={() => pending(app.id)}
      isAllowing={isAllowing}
      isPendingRevert={isPendingRevert}
    />,
  ] : [
    <Checkbox
      selected={selectedIds.has(app.id)}
      onClick={() => toggleOne(app.id)}
      size="small"
    />,
    <button
      className="text-primary-normal font-medium hover:underline text-left"
      onClick={() => openInfoDialog(app)}
    >
      {app.leader.name}
    </button>,
    app.leader.student
      ? `${app.leader.student.grade}${app.leader.student.room}${String(app.leader.student.number).padStart(2, "0")}`
      : "-",
    <div className="truncate max-w-xs text-text-secondary">{app.status === "REJECTED" ? <p className="text-status-error">{`거절 사유 : ${app.rejectionReason}`}</p> : app.description}</div>,
    `심${app.period}까지`,
    parseDate(app.startAt),
    parseDate(app.endAt),
    app.needPhone ? "O" : "X",
    <div className="shrink-0 whitespace-nowrap">
      <span style={{ color: NIGHT_STUDY_STATUS_COLOR[app.status] }}>
        {NIGHT_STUDY_STATUS_LABEL[app.status]}
      </span>
    </div>,
    <PersonalActionCell
      status={app.status}
      onAllow={() => allow(app.id)}
      onReject={() => openRejectDialog(app.id)}
      onPending={() => pending(app.id)}
      isAllowing={isAllowing}
      isPendingRevert={isPendingRevert}
    />,
  ]);

  return (
    <div className="flex flex-col overflow-y-auto grow min-w-0">
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 self-start">
          <FilledButton
            role="primary"
            size="small"
            display="inline"
            disabled={isAllowing || hasSelectedAllowedApplication}
            onClick={() => handleBulkAllow(Array.from(selectedIds))}
          >
            일괄 승인
          </FilledButton>
          <FilledButton
            role="negative"
            size="small"
            display="inline"
            onClick={() => openBulkRejectDialog(Array.from(selectedIds))}
          >
            일괄 거절
          </FilledButton>
        </div>
      )}
      <div className="overflow-x-auto min-w-0">
        <div className="sm:min-w-174">
          <Table keys={tableKeys} data={rows} />
          {isFetchingNextPage && <PersonalSkeletonRows count={3} />}
          <div ref={ref} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default PersonalTableData;
