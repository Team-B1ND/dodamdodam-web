import type { PersonalNightStudyApplication } from "@/entities/night-study/types";
import { parseDate } from "@/shared/utils/parse-date";
import { Dialog } from "@b1nd/dodam-design-system/components";

interface Props {
  application: PersonalNightStudyApplication;
  isOpen: boolean;
  onClose: () => void;
}

const PersonalInfoDialog = ({ application, isOpen, onClose }: Props) => {
  const { leader } = application;
  const studentId = leader.student
    ? `${leader.student.grade}${leader.student.room}${String(leader.student.number).padStart(2, "0")}`
    : "-";

  return (
    <Dialog
      open={isOpen}
      title={`${leader.name} 심야자습 신청`}
      onClose={onClose}
      closeOnDimmerClick
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 text-body1">
          <div className="flex gap-2">
            <span className="text-text-secondary w-20 shrink-0">학반</span>
            <span>{studentId}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-text-secondary w-20 shrink-0">기간</span>
            <span>
              {parseDate(application.startAt)} ~ {parseDate(application.endAt)}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-text-secondary w-20 shrink-0">휴대폰</span>
            <span>{application.needPhone ? "필요" : "불필요"}</span>
          </div>
          {application.needPhone && application.needPhoneReason && (
            <div className="flex gap-2">
              <span className="text-text-secondary w-20 shrink-0">필요 이유</span>
              <span>{application.needPhoneReason}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-label font-bold text-text-secondary">심자 사유</span>
          <p className="text-body1 whitespace-pre-wrap">{application.description}</p>
        </div>
        <Dialog.FilledButton role="assistive" onClick={onClose}>
          닫기
        </Dialog.FilledButton>
      </div>
    </Dialog>
  );
};

export default PersonalInfoDialog;
