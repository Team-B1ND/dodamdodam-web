import {
  WEEKEND_STUDY_STATUS_LABEL,
  formatPeriodsTime,
  formatStudentNumber,
  formatWeekendStudyDate,
} from "@/entities/weekend-study/constants";
import {
  useAssignWeekendStudyRoomMutation,
  useUnassignWeekendStudyRoomMutation,
} from "@/entities/weekend-study/mutations";
import { useGetWeekendStudyRoomsQuery } from "@/entities/weekend-study/queries";
import type { WeekendStudyApplication } from "@/entities/weekend-study/types";
import QueryBoundary from "@/shared/ui/query-boundary";
import { Dialog, FilledButton } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

interface Props {
  application: WeekendStudyApplication;
  isOpen: boolean;
  onClose: () => void;
}

const RoomAssignment = ({ application, onClose }: Omit<Props, "isOpen">) => {
  const { data } = useGetWeekendStudyRoomsQuery();
  const [roomId, setRoomId] = useState<number | undefined>(
    application.room?.id ?? application.wishRoom?.id,
  );
  const { mutate: assign, isPending: isAssigning } =
    useAssignWeekendStudyRoomMutation();
  const { mutate: unassign, isPending: isUnassigning } =
    useUnassignWeekendStudyRoomMutation();
  const canAssign = application.status === "ALLOWED";

  return (
    <div className="flex flex-col gap-3">
      <span className="text-label font-bold text-text-secondary">실 배정</span>
      {!canAssign && (
        <p className="text-caption1 text-status-error">
          승인된 신청에만 실을 배정할 수 있어요.
        </p>
      )}
      <div role="radiogroup" className="grid grid-cols-2 gap-3">
        {data.data.map((room) => (
          <label
            key={room.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="weekend-room"
              value={room.id}
              checked={roomId === room.id}
              disabled={!canAssign}
              onChange={() => setRoomId(room.id)}
              className="accent-brand-primary"
            />
            <div className="flex flex-col">
              <span className="text-body1 font-bold">{room.name}</span>
              <span className="text-caption1 text-text-tertiary">
                {room.floor}층
                {application.wishRoom?.id === room.id ? " · 희망 실" : ""}
              </span>
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        {application.room && (
          <FilledButton
            role="assistive"
            size="medium"
            display="inline"
            disabled={isUnassigning}
            onClick={() => unassign(application.id, { onSuccess: onClose })}
          >
            배정 해제
          </FilledButton>
        )}
        <FilledButton
          role="primary"
          size="medium"
          display="inline"
          disabled={!canAssign || roomId === undefined || isAssigning}
          onClick={() =>
            roomId !== undefined &&
            assign({ id: application.id, roomId }, { onSuccess: onClose })
          }
        >
          배정하기
        </FilledButton>
      </div>
    </div>
  );
};

const ProjectRentalDialog = ({ application, isOpen, onClose }: Props) => (
  <Dialog
    open={isOpen}
    title={application.name ?? "실 대여 신청"}
    onClose={onClose}
    closeOnDimmerClick
  >
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 text-body1">
        {[
          ["상태", WEEKEND_STUDY_STATUS_LABEL[application.status]],
          ["진행 날짜", formatWeekendStudyDate(application.date)],
          ["시간대", formatPeriodsTime(application.periods)],
          ["희망 실", application.wishRoom?.name ?? "-"],
          ["배정 실", application.room?.name ?? "미배정"],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-2">
            <span className="text-text-secondary w-20 shrink-0">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-label font-bold text-text-secondary">
          참여 인원
        </span>
        <div className="flex flex-wrap gap-2">
          {[application.leader, ...application.members].map((member) => (
            <span
              key={member.publicId}
              className="bg-background-default rounded-full px-3 py-1 text-body1"
            >
              {formatStudentNumber(member.student)} {member.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-label font-bold text-text-secondary">
          프로젝트 개요
        </span>
        <p className="text-body1 whitespace-pre-wrap">
          {application.description}
        </p>
      </div>
      {application.status === "REJECTED" && (
        <div className="flex flex-col gap-1">
          <span className="text-label font-bold text-text-secondary">
            거절 사유
          </span>
          <p className="text-body1 text-status-error">
            {application.rejectionReason ?? "-"}
          </p>
        </div>
      )}
      <QueryBoundary
        pendingFallback={<div className="skeleton h-24 rounded-medium" />}
      >
        <RoomAssignment application={application} onClose={onClose} />
      </QueryBoundary>
      <Dialog.FilledButton role="assistive" onClick={onClose}>
        닫기
      </Dialog.FilledButton>
    </div>
  </Dialog>
);

export default ProjectRentalDialog;
