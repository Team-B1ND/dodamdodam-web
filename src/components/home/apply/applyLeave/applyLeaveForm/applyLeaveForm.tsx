import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import { ApplyLeave } from "../../../../../types/leave/leave.type";
import {
  ApplyLeaveFormColumnTitle,
  ApplyLeaveFormColumnWrap,
  ApplyLeaveFormContainer,
  ApplyLeaveFormDatePickerIcon,
  ApplyLeaveFormDatePickerWrap,
  ApplyLeaveFormNoticeText,
  ApplyLeaveFormTextArea,
  ApplyLeaveFormTimeInput,
  ApplyLeaveFormTimeInputWrap,
} from "./style";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import dateTransform from "../../../../../util/date/dateTransform";
import { IoMdCalendar } from "react-icons/io";

interface Props {
  isFold: boolean;
  leaveData: ApplyLeave;
  handleLeaveData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLeaveDataReason: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleLeaveDataDate: (
    e: MaterialUiPickersDate,
    scope: "start" | "end"
  ) => void;
  notApproveLeavesLength: number;
}

const ApplyLeaveForm = ({
  isFold,
  leaveData,
  handleLeaveData,
  handleLeaveDataDate,
  handleLeaveDataReason,
  notApproveLeavesLength,
}: Props) => {
  return (
    <ApplyLeaveFormContainer isFold={isFold}>
      {!isFold && notApproveLeavesLength === 0 ? (
        <>수정할 외박 정보가 없습니다.</>
      ) : (
        <>
          <ApplyLeaveFormColumnWrap style={{ marginBottom: 10 }}>
            <ApplyLeaveFormColumnTitle>출발 일자</ApplyLeaveFormColumnTitle>
            <ApplyLeaveFormDatePickerWrap>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableToolbar
                  variant="inline"
                  id="startDatePicker"
                  format="yyyy/MM/dd"
                  value={leaveData.startTimeDate}
                  style={{
                    width: 137,
                    fontSize: 16,
                    height: 32,
                  }}
                  onChange={(e) => handleLeaveDataDate(e, "start")}
                  minDate={dateTransform.hyphen()}
                  maxDate={dayjs(dateTransform.hyphen()).format("YYYY-12-31")}
                />
              </MuiPickersUtilsProvider>
              <ApplyLeaveFormDatePickerIcon htmlFor="startDatePicker">
                <IoMdCalendar />
              </ApplyLeaveFormDatePickerIcon>
            </ApplyLeaveFormDatePickerWrap>
            <ApplyLeaveFormTimeInputWrap>
              <ApplyLeaveFormTimeInput
                placeholder="0 ~ 23"
                value={leaveData.startTimeHour}
                name="startTimeHour"
                onChange={handleLeaveData}
              />
              :
              <ApplyLeaveFormTimeInput
                placeholder="0 ~ 59"
                value={leaveData.startTimeMinute}
                name="startTimeMinute"
                onChange={handleLeaveData}
              />
            </ApplyLeaveFormTimeInputWrap>
          </ApplyLeaveFormColumnWrap>
          <ApplyLeaveFormColumnWrap style={{ marginBottom: 5 }}>
            <ApplyLeaveFormColumnTitle>도착 일자</ApplyLeaveFormColumnTitle>
            <ApplyLeaveFormDatePickerWrap>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableToolbar
                  variant="inline"
                  id="endDatePicker"
                  format="yyyy/MM/dd"
                  value={leaveData.endTimeDate}
                  style={{
                    width: 137,
                    fontSize: 16,
                    height: 32,
                  }}
                  onChange={(e) => handleLeaveDataDate(e, "end")}
                  minDate={dayjs(dateTransform.hyphen()).format("YYYY-01-01")}
                  maxDate={dayjs(dateTransform.hyphen()).format("YYYY-12-31")}
                />
              </MuiPickersUtilsProvider>
              <ApplyLeaveFormDatePickerIcon htmlFor="endDatePicker">
                <IoMdCalendar />
              </ApplyLeaveFormDatePickerIcon>
            </ApplyLeaveFormDatePickerWrap>
            <ApplyLeaveFormTimeInputWrap>
              <ApplyLeaveFormTimeInput
                placeholder="0 ~ 23"
                value={leaveData.endTimeHour}
                name="endTimeHour"
                onChange={handleLeaveData}
              />
              :
              <ApplyLeaveFormTimeInput
                placeholder="0 ~ 59"
                value={leaveData.endTimeMinute}
                name="endTimeMinute"
                onChange={handleLeaveData}
              />
            </ApplyLeaveFormTimeInputWrap>
          </ApplyLeaveFormColumnWrap>
          <ApplyLeaveFormNoticeText>
            ※시간은 24시간 형태로 작성해야합니다.
          </ApplyLeaveFormNoticeText>
          <ApplyLeaveFormTextArea
            value={leaveData.reason}
            name="reason"
            onChange={handleLeaveDataReason}
            placeholder="사유를 입력해주세요."
          />
          <ApplyLeaveFormNoticeText>
            ※학생 관리자를 포함한 서비스 관리자가 해당 정보를 볼 수 있습니다.
          </ApplyLeaveFormNoticeText>
        </>
      )}
    </ApplyLeaveFormContainer>
  );
};

export default ApplyLeaveForm;
