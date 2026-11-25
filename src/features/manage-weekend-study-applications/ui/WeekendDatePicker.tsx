import { isWeekendStudyDay } from "@/entities/weekend-study/constants";
import { padDate } from "@/shared/utils/pad-date";
import {
  DatePicker,
  FilledButton,
  PickerTrigger,
  useToast,
} from "@b1nd/dodam-design-system/components";
import dayjs from "dayjs";

interface Props {
  /** `YYYY-MM-DD` */
  value: string;
  onChange: (date: string) => void;
}

/** 관리 화면에서 볼 일요일을 골라요. 지난 일요일의 신청·출석도 볼 수 있어요. */
const WeekendDatePicker = ({ value, onChange }: Props) => {
  const toast = useToast();

  const handleChange = (next: Date) => {
    if (!isWeekendStudyDay(next)) {
      toast.warning("주말 자습은 일요일만 운영해요. 일요일을 골라주세요.");
      return;
    }
    onChange(dayjs(next).format("YYYY-MM-DD"));
  };

  return (
    // 버튼이 필터 줄 오른쪽에 있어서 달력을 오른쪽 기준으로 펼쳐요. DS 스타일(emotion)은 CSS 레이어 밖이라 left는 !important로 덮어요.
    <div className="[&>div>div:last-child]:left-auto! [&>div>div:last-child]:right-0">
      <PickerTrigger
        content={({ onClose }) => (
          <DatePicker.Content
            date={dayjs(value).toDate()}
            onChangeDate={handleChange}
            onClose={onClose}
          />
        )}
      >
        <FilledButton role="assistive" size="medium">
          {padDate(dayjs(value).toDate())}
        </FilledButton>
      </PickerTrigger>
    </div>
  );
};

export default WeekendDatePicker;
