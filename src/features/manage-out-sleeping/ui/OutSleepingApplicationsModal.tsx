import { colors } from "@b1nd/dodam-design-system/colors"
import { FilledButton } from "@b1nd/dodam-design-system/components";
import { Close } from "@b1nd/dodam-design-system/icons"
import { useManageOutSleeping } from "@/features/manage-out-sleeping/model/useManageOutSleeping";

interface Props {
  name: string;
  studentId: string;
  startDate: string;
  endDate: string;
  reason: string;
  publicId: string;
  onClose: () => void;
}

const OutSleepingApplicationsModal = ({
  name,
  studentId,
  startDate,
  endDate,
  reason,
  publicId,
  onClose,
}: Props) => {
  const { allowOutSleeping, openDenyDialog, isAllowing } = useManageOutSleeping();

  const row = (key: string, data: string) => {
    return (
      <div className="flex">
        <p className="min-w-18">{key}</p>
        {data}
      </div>
    );
  }

  return (
    <div className="small-container flex flex-col gap-4 w-80">
      <div className="flex justify-between items-center w-full">
        <p className="text-heading2 font-bold">{name}의 외박 신청</p>
        <button type="button" onClick={onClose} className="cursor-pointer">
          <Close color={colors.text.primary} pointer />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {row("학생정보", studentId)}
        {row("출발일자", startDate)}
        {row("도착일자", endDate)}
        {row("사유", reason)}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FilledButton
          role="primary"
          disabled={isAllowing}
          onClick={() => allowOutSleeping(publicId, { onSuccess: onClose })}
        >
          승인
        </FilledButton>
        <FilledButton
          role="negative"
          onClick={() => openDenyDialog(publicId, { onSuccess: onClose })}
        >
          거절
        </FilledButton>
      </div>
    </div>
  );
}

export default OutSleepingApplicationsModal
