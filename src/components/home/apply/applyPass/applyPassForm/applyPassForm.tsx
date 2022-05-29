import {
  ApplyPassFormColumnTitle,
  ApplyPassFormColumnWrap,
  ApplyPassFormContainer,
  ApplyPassFormDatePickerIcon,
  ApplyPassFormDatePickerWrap,
} from "./style";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import { IoMdCalendar } from "react-icons/io";
import dateTransform from "../../../../../util/date/dateTransform";

const ApplyPassForm = () => {
  return (
    <ApplyPassFormContainer>
      <ApplyPassFormColumnWrap>
        <ApplyPassFormColumnTitle>신청 일자</ApplyPassFormColumnTitle>
        <ApplyPassFormDatePickerWrap>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              id="datePicker"
              format="yyyy/MM/dd"
              value={dateTransform.hyphen()}
              style={{
                width: 222,
                fontSize: 16,
                height: 32,
              }}
              onChange={() => {}}
              minDate={dayjs(dateTransform.hyphen()).format("YYYY-01-01")}
              maxDate={dayjs(dateTransform.hyphen()).format("YYYY-12-31")}
            />

            <ApplyPassFormDatePickerIcon htmlFor="datePicker">
              <IoMdCalendar />
            </ApplyPassFormDatePickerIcon>
          </MuiPickersUtilsProvider>
        </ApplyPassFormDatePickerWrap>
      </ApplyPassFormColumnWrap>
    </ApplyPassFormContainer>
  );
};

export default ApplyPassForm;
