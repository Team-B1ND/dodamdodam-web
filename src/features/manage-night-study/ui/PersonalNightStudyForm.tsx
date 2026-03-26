import { padDate } from "@/shared/utils/pad-date";
import {
  Checkbox,
  DatePicker,
  FilledButton,
  PickerTrigger,
} from "@b1nd/dodam-design-system/components";
import { useApplyPersonalNightStudy } from "../hooks/useApplyPersonalNightStudy";

const PersonalNightStudyForm = () => {
  const {
    form,
    handleDateChange,
    handleStringChange,
    handleBooleanChange,
    submit,
    isPending,
  } = useApplyPersonalNightStudy();

  const { period, startAt, endAt, needPhone, needPhoneReason, description } = form;

  return (
    <div className="w-full flex flex-col gap-4 items-end">
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-headline font-bold">심자 시간 선택</h1>
        <p className="text-caption1 font-regular text-status-error">
          주의: 심자 2 신청 시 심자 1도 필수 참석해야 합니다. 또한 9시
          50분부터는 정비시간입니다.
        </p>
      </div>
      <div className="w-full px-5 flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center flex-col gap-0.5">
            <p className="text-body1 font-bold">심자1</p>
            <p className="text-caption2 font-bold text-text-tertiary">
              9:50까지
            </p>
          </div>
          <div className="flex items-center flex-col gap-0.5">
            <p className="text-body1 font-bold">심자2</p>
            <p className="text-caption2 font-bold text-text-tertiary">
              11:50까지
            </p>
          </div>
        </div>
        <input
          type="range"
          min={1}
          max={2}
          step={1}
          value={period}
          onChange={(e) => handleStringChange("period", e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-headline font-bold">신청 기한</h1>
          <div className="w-full flex items-center justify-between">
            <p>시작 날짜</p>
            <PickerTrigger
              content={({ onClose }) => (
                <DatePicker.Content
                  date={startAt}
                  onChangeDate={(date) => handleDateChange("startAt", date)}
                  onClose={onClose}
                  disablePast
                />
              )}>
              <FilledButton role="assistive" size="medium">
                {startAt ? padDate(startAt) : "YYYY-MM-DD"}
              </FilledButton>
            </PickerTrigger>
          </div>
          <div className="w-full flex items-center justify-between">
            <p>종료 날짜</p>
            <PickerTrigger
              content={({ onClose }) => (
                <DatePicker.Content
                  date={endAt}
                  onChangeDate={(date) => handleDateChange("endAt", date)}
                  onClose={onClose}
                  disablePast
                />
              )}>
              <FilledButton role="assistive" size="medium">
                {endAt ? padDate(endAt) : "YYYY-MM-DD"}
              </FilledButton>
            </PickerTrigger>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-headline font-bold">핸드폰 필요 여부</h1>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center gap-3">
              <Checkbox
                size="small"
                onClick={() => handleBooleanChange("needPhone", !needPhone)}
                selected={needPhone}
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-body1 font-bold">핸드폰이 필요하신가요?</p>
                <p className="text-caption2 text-status-error">
                  체크하셨다면 사유를 꼭 적어주세요
                </p>
              </div>
            </div>
            <textarea
              className="w-full h-30 rounded-medium bg-fill-primary p-3 text-body1 font-medium resize-none placeholder:text-text-tertiary"
              placeholder="사유를 입력해주세요."
              value={needPhoneReason}
              onChange={(e) => handleStringChange("needPhoneReason", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div>
          <p className="text-headline font-bold">학습 내용</p>
          <p className="text-caption2 text-status-error">
            10 ~ 250 이내로 작성해주세요.
          </p>
        </div>
        <textarea
          className="w-full h-30 rounded-medium bg-fill-primary p-3 text-body1 font-medium resize-none placeholder:text-text-tertiary"
          placeholder="학습 내용을 입력해주세요."
          value={description}
          onChange={(e) => handleStringChange("description", e.target.value)}
        />
      </div>
      <FilledButton size="large" disabled={isPending} onClick={submit}>
        {isPending ? "신청하는 중..." : "심자 신청하기"}
      </FilledButton>
    </div>
  );
};

export default PersonalNightStudyForm;
