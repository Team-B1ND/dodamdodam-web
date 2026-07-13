import {
  DatePicker,
  Dropdown,
  FilledButton,
  FilledTextField,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import { SCHEDULE_TARGET_ITEMS } from "@/features/get-schedule/constants/schedule-target";
import { useAddSchedule } from "@/features/get-schedule/model/useAddSchedule";
import { padDate } from "@/shared/utils/pad-date";

interface AddScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddScheduleDialog = ({ isOpen, onClose }: AddScheduleDialogProps) => {
  const {
    title,
    startAt,
    endAt,
    target,
    setStartAt,
    setEndAt,
    setTarget,
    handleTitle,
    saveForm,
    submit,
    isPending,
  } = useAddSchedule();
  const overlay = useOverlay();

  const openStartDatePicker = () => {
    overlay.open(({ close, exit, setDimClickHandler }) => {
      const onClose = () => {
        close();
        exit();
      };

      setDimClickHandler(onClose);

      return (
        <DatePicker.Content
          date={startAt}
          onChangeDate={setStartAt}
          onClose={onClose}
        />
      );
    });
  };

  const openEndDatePicker = () => {
    overlay.open(({ close, exit, setDimClickHandler }) => {
      const onClose = () => {
        close();
        exit();
      };

      setDimClickHandler(onClose);

      return (
        <DatePicker.Content
          date={endAt}
          onChangeDate={setEndAt}
          onClose={onClose}
        />
      );
    });
  };

  const closeAddSchedule = () => {
    saveForm();
    onClose();
  };

  const submitAddSchedule = async () => {
    const isSuccess = await submit();

    if (isSuccess) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside className="w-full bg-background-surface rounded-large p-4 flex flex-col gap-4 overflow-visible">
      <h2 className="text-heading1 font-bold text-text-primary">일정 추가</h2>
      <FilledTextField
        type="text"
        label="일정명"
        placeholder="일정명을 입력해주세요."
        value={title}
        onChange={handleTitle}
      />
      <div className="flex justify-between items-center overflow-visible">
        <p className="text-label font-medium text-text-secondary">시작 날짜</p>
        <FilledButton
          role="assistive"
          size="medium"
          onClick={openStartDatePicker}
        >
          {startAt ? padDate(startAt) : "YYYY-MM-DD"}
        </FilledButton>
      </div>
      <div className="flex justify-between items-center overflow-visible">
        <p className="text-label font-medium text-text-secondary">종료 날짜</p>
        <FilledButton role="assistive" size="medium" onClick={openEndDatePicker}>
          {endAt ? padDate(endAt) : "YYYY-MM-DD"}
        </FilledButton>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-label font-medium text-text-secondary">대상</p>
        <Dropdown
          items={SCHEDULE_TARGET_ITEMS}
          value={target.name}
          onSelectedItemChange={setTarget}
        />
      </div>
      <div className="flex gap-2">
        <FilledButton
          role="assistive"
          size="large"
          display="fill"
          onClick={closeAddSchedule}
        >
          취소
        </FilledButton>
        <FilledButton
          role="primary"
          size="large"
          display="fill"
          disabled={isPending}
          onClick={submitAddSchedule}
        >
          {isPending ? "추가 중.." : "추가"}
        </FilledButton>
      </div>
    </aside>
  );
};

export default AddScheduleDialog;
