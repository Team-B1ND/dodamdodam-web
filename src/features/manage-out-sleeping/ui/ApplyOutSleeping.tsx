import { useApplyOutSleeping } from "@/features/manage-out-sleeping/model/useApplyOutSleeping";
import { padDate } from "@/shared/utils/pad-date";
import { parseDate } from "@/shared/utils/parse-date";
import { colors } from "@b1nd/dodam-design-system/colors";
import { DatePicker, FilledButton, useOverlay } from "@b1nd/dodam-design-system/components";
import { Calendar } from "@b1nd/dodam-design-system/icons";

const ApplyOutSleeping = () => {
  const { startAt, endAt, setStartAt, setEndAt, reason, handleReason, submit, isPending } = useApplyOutSleeping();
  const overlay = useOverlay();

  const openDatePicker = (date: Date, setDate: (date: Date) => void) => {
    overlay.open(({ isOpen, close, exit, setDimClickHandler }) => (
      <DatePicker
        open={isOpen}
        date={date}
        onChangeDate={setDate}
        onClose={close}
        onExited={exit}
        setDimClickHandler={setDimClickHandler}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p>출발 일자</p>
        <div
          className="flex gap-3"
          onClick={() => openDatePicker(startAt, setStartAt)}
        >
          <p className="text-brand-primary text-headline font-normal">
            {parseDate(padDate(startAt))}
          </p>
          <Calendar color={colors.brand.primary} size={24} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>도착 일자</p>
        <div
          className="flex gap-3"
          onClick={() => openDatePicker(endAt, setEndAt)}
        >
          <p className="text-brand-primary text-headline font-normal">
            {parseDate(padDate(endAt))}
          </p>
          <Calendar color={colors.brand.primary} size={24} />
        </div>
      </div>
      <textarea
        value={reason}
        onChange={handleReason}
        placeholder="사유를 입력해주세요."
        className="border border-border-normal rounded-small py-3 px-4 resize-none h-40 outline-none"
      />
      <div className="grid grid-cols-2 gap-3 grow">
        <FilledButton role="assistive">신청 현황</FilledButton>
        <FilledButton onClick={submit}>{isPending ? "신청 중.." : "신청"}</FilledButton>
      </div>
    </div>
  );
}

export default ApplyOutSleeping