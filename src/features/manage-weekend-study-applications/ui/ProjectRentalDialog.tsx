import {
  formatPeriodsTime,
  formatStudentNumber,
  formatWeekendStudyDate,
} from "@/entities/weekend-study/constants";
import type { WeekendStudyApplication } from "@/entities/weekend-study/types";
import { Dialog } from "@b1nd/dodam-design-system/components";

interface Props {
  application: WeekendStudyApplication;
  isOpen: boolean;
  onClose: () => void;
}

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
          ["진행 날짜", formatWeekendStudyDate(application.date)],
          ["시간대", formatPeriodsTime(application.periods)],
          ["실", application.room?.name ?? "-"],
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
      <Dialog.FilledButton role="assistive" onClick={onClose}>
        닫기
      </Dialog.FilledButton>
    </div>
  </Dialog>
);

export default ProjectRentalDialog;
