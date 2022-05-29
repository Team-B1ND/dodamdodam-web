import {
  ApplyPassFormColumnTitle,
  ApplyPassFormColumnWrap,
  ApplyPassFormContainer,
  ApplyPassFormTimeInputWrap,
  ApplyPassFormDatePickerIcon,
  ApplyPassFormDatePickerWrap,
  ApplyPassFormTimeInput,
  ApplyPassFormTimeInputTilde,
  ApplyPassFormInputWrap,
  ApplyPassFormNoticeText,
} from "./style";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import { IoMdCalendar } from "react-icons/io";
import dateTransform from "../../../../../util/date/dateTransform";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface Props {
  isFold: boolean;
  passDataDate: string;
  handlePassDataDate: (e: MaterialUiPickersDate) => void;
}

const ApplyPassForm = ({ isFold, passDataDate, handlePassDataDate }: Props) => {
  return (
    <ApplyPassFormContainer isFold={isFold}>
      <ApplyPassFormColumnWrap style={{ marginBottom: 16 }}>
        <ApplyPassFormColumnTitle>신청 일자</ApplyPassFormColumnTitle>
        <ApplyPassFormInputWrap>
          <ApplyPassFormDatePickerWrap>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableToolbar
                variant="inline"
                id="datePicker"
                format="yyyy/MM/dd"
                value={passDataDate}
                style={{
                  width: 222,
                  fontSize: 16,
                  height: 32,
                }}
                onChange={handlePassDataDate}
                minDate={dayjs(dateTransform.hyphen()).format("YYYY-01-01")}
                maxDate={dayjs(dateTransform.hyphen()).format("YYYY-12-31")}
              />

              <ApplyPassFormDatePickerIcon htmlFor="datePicker">
                <IoMdCalendar />
              </ApplyPassFormDatePickerIcon>
            </MuiPickersUtilsProvider>
          </ApplyPassFormDatePickerWrap>
        </ApplyPassFormInputWrap>
      </ApplyPassFormColumnWrap>
      <ApplyPassFormColumnWrap style={{ marginBottom: 10 }}>
        <ApplyPassFormColumnTitle>외출 시간</ApplyPassFormColumnTitle>
        <ApplyPassFormInputWrap>
          <ApplyPassFormTimeInputWrap>
            <ApplyPassFormTimeInput placeholder="0 ~ 23" />
            :
            <ApplyPassFormTimeInput placeholder="0 ~ 59" />
          </ApplyPassFormTimeInputWrap>
          <ApplyPassFormTimeInputTilde>~</ApplyPassFormTimeInputTilde>
          <ApplyPassFormTimeInputWrap>
            <ApplyPassFormTimeInput placeholder="0 ~ 23" />
            :
            <ApplyPassFormTimeInput placeholder="0 ~ 59" />
          </ApplyPassFormTimeInputWrap>
        </ApplyPassFormInputWrap>
      </ApplyPassFormColumnWrap>
      <ApplyPassFormNoticeText>
        ※시간은 24시간 형태로 작성해야합니다.
      </ApplyPassFormNoticeText>
    </ApplyPassFormContainer>
  );
};

export default ApplyPassForm;
