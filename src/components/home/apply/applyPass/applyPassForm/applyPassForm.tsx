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
  ApplyPassFormTextArea,
} from "./style";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import { IoMdCalendar } from "react-icons/io";
import dateTransform from "../../../../../util/date/dateTransform";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { ApplyPass } from "../../../../../types/pass/pass.type";

interface Props {
  isFold: boolean;
  passData: ApplyPass;
  passDataDate: string;
  handlePassData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePassDataReason: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePassDataDate: (e: MaterialUiPickersDate) => void;
  notApprovePassesLength: number;
}

const ApplyPassForm = ({
  isFold,
  passData,
  handlePassData,
  passDataDate,
  handlePassDataDate,
  handlePassDataReason,
  notApprovePassesLength,
}: Props) => {
  return (
    <ApplyPassFormContainer isFold={isFold}>
      {!isFold && notApprovePassesLength === 0 ? (
        <>수정할 외출 정보가 없습니다.</>
      ) : (
        <>
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
          <ApplyPassFormColumnWrap style={{ marginBottom: 5 }}>
            <ApplyPassFormColumnTitle>외출 시간</ApplyPassFormColumnTitle>
            <ApplyPassFormInputWrap>
              <ApplyPassFormTimeInputWrap>
                <ApplyPassFormTimeInput
                  placeholder="0 ~ 23"
                  value={passData.startTimeHour}
                  name="startTimeHour"
                  onChange={handlePassData}
                />
                :
                <ApplyPassFormTimeInput
                  placeholder="0 ~ 59"
                  value={passData.startTimeMinute}
                  name="startTimeMinute"
                  onChange={handlePassData}
                />
              </ApplyPassFormTimeInputWrap>
              <ApplyPassFormTimeInputTilde>~</ApplyPassFormTimeInputTilde>
              <ApplyPassFormTimeInputWrap>
                <ApplyPassFormTimeInput
                  placeholder="0 ~ 23"
                  value={passData.endTimeHour}
                  name="endTimeHour"
                  onChange={handlePassData}
                />
                :
                <ApplyPassFormTimeInput
                  placeholder="0 ~ 59"
                  value={passData.endTimeMinute}
                  name="endTimeMinute"
                  onChange={handlePassData}
                />
              </ApplyPassFormTimeInputWrap>
            </ApplyPassFormInputWrap>
          </ApplyPassFormColumnWrap>
          <ApplyPassFormNoticeText>
            ※시간은 24시간 형태로 작성해야합니다.
          </ApplyPassFormNoticeText>
          <ApplyPassFormTextArea
            value={passData.reason}
            name="reason"
            onChange={handlePassDataReason}
            placeholder="사유를 입력해주세요."
          />
          <ApplyPassFormNoticeText>
            ※학생 관리자를 포함한 서비스 관리자가 해당 정보를 볼 수 있습니다.
          </ApplyPassFormNoticeText>
        </>
      )}
    </ApplyPassFormContainer>
  );
};

export default ApplyPassForm;
