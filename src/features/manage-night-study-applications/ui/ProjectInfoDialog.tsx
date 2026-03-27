import type { ProjectNightStudyApplication } from "@/entities/night-study/types";
import { parseDate } from "@/shared/utils/parse-date";
import { Dialog } from "@b1nd/dodam-design-system/components";

interface Props {
  application: ProjectNightStudyApplication;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectInfoDialog = ({ application, isOpen, onClose }: Props) => {
  return (
    <Dialog
      open={isOpen}
      title={application.name}
      onClose={onClose}
      closeOnDimmerClick
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 text-body1">
          <div className="flex gap-2">
            <span className="text-text-secondary w-20 shrink-0">진행 시간</span>
            <span>{application.period}교시</span>
          </div>
          <div className="flex gap-2">
            <span className="text-text-secondary w-20 shrink-0">기간</span>
            <span>
              {parseDate(application.startAt)} ~ {parseDate(application.endAt)}
            </span>
          </div>
          {application.room && (
            <div className="flex gap-2">
              <span className="text-text-secondary w-20 shrink-0">배정 랩실</span>
              <span>{application.room.name}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-label font-bold text-text-secondary">참여 인원</span>
          <div className="flex flex-wrap gap-2">
            {application.members.map((member) => (
              <span
                key={member.publicId}
                className="bg-background-default rounded-full px-3 py-1 text-body1"
              >
                {member.student
                  ? `${member.student.grade}${member.student.room}${String(member.student.number).padStart(2, "0")} `
                  : ""}{member.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-label font-bold text-text-secondary">프로젝트 개요</span>
          <p className="text-body1 whitespace-pre-wrap">{application.description}</p>
        </div>
        <Dialog.FilledButton role="assistive" onClick={onClose}>
          닫기
        </Dialog.FilledButton>
      </div>
    </Dialog>
  );
};

export default ProjectInfoDialog;
