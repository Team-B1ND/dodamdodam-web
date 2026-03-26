import { DatePicker, Dropdown, FilledButton, FilledTextField, PickerTrigger } from "@b1nd/dodam-design-system/components";
import { PERIOD_OPTIONS } from "../constants/period-options";
import { padDate } from "@/shared/utils/pad-date";
import { useApplyProjectNightStudy } from "../hooks/useApplyProjectNightStudy";

const ProjectNightStudyInfoForm = () => {
  const { form, handleDateChange, handleStringChange, handleDropdownChange } =
    useApplyProjectNightStudy();
  const { period, startAt, endAt, name, description } = form;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col items-start gap-3">
        <h1 className="text-headline font-bold">신청 기한</h1>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-headline font-medium text-text-secondary">진행 시각</p>
              <p className="text-caption2 text-status-error">
                ( 하나의 프로젝트는 심자 1, 2중 하나만 신청 가능합니다. )
              </p>
            </div>
            <Dropdown
              items={PERIOD_OPTIONS}
              onSelectedItemChange={(item) => handleDropdownChange("period", item)}
              value={period.name}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-headline font-medium text-text-secondary">시작 날짜</p>
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
            <p className="text-headline font-medium text-text-secondary">종료 날짜</p>
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
      </div>
      <div className="w-full h-px bg-border-normal" />
      <div className="w-full flex flex-col items-start gap-3">
        <h1 className="text-headline font-bold">프로젝트 진행 정보</h1>
        <div className="w-full flex flex-col gap-2">
          <div>
            <p className="text-body1 font-bold">프로젝트명</p>
            <p className="text-caption2 text-status-error">
              20자 이내로 작성해주세요.
            </p>
          </div>
          <FilledTextField
            label=""
            type="text"
            placeholder="프로젝트명을 입력해주세요."
            value={name}
            onChange={(e) => handleStringChange("name", e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div>
            <p className="text-body1 font-bold">프로젝트 개요</p>
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
      </div>
    </div>
  );
};

export default ProjectNightStudyInfoForm;
