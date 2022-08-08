import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import { ApplyLeave } from "../../../../../types/leave/leave.type";
import * as S from "./style";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import dateTransform from "../../../../../util/date/dateTransform";
import { IoMdCalendar } from "react-icons/io";
import { TextArea } from "@team-b1nd/dodamdodam_web_component_library";

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
    <S.ApplyLeaveFormContainer isFold={isFold}>
      {!isFold && notApproveLeavesLength === 0 ? (
        <>수정할 외박 정보가 없습니다.</>
      ) : (
        <>
          <S.ApplyLeaveFormColumnWrap style={{ marginBottom: 10 }}>
            <S.ApplyLeaveFormColumnTitle>출발 일자</S.ApplyLeaveFormColumnTitle>
            <S.ApplyLeaveFormDatePickerWrap>
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
              <S.ApplyLeaveFormDatePickerIcon htmlFor="startDatePicker">
                <IoMdCalendar />
              </S.ApplyLeaveFormDatePickerIcon>
            </S.ApplyLeaveFormDatePickerWrap>
            <S.ApplyLeaveFormTimeInputWrap>
              <S.ApplyLeaveFormTimeInput
                placeholder="0 ~ 23"
                value={leaveData.startTimeHour}
                name="startTimeHour"
                onChange={handleLeaveData}
              />
              :
              <S.ApplyLeaveFormTimeInput
                placeholder="0 ~ 59"
                value={leaveData.startTimeMinute}
                name="startTimeMinute"
                onChange={handleLeaveData}
              />
            </S.ApplyLeaveFormTimeInputWrap>
          </S.ApplyLeaveFormColumnWrap>
          <S.ApplyLeaveFormColumnWrap style={{ marginBottom: 5 }}>
            <S.ApplyLeaveFormColumnTitle>도착 일자</S.ApplyLeaveFormColumnTitle>
            <S.ApplyLeaveFormDatePickerWrap>
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
              <S.ApplyLeaveFormDatePickerIcon htmlFor="endDatePicker">
                <IoMdCalendar />
              </S.ApplyLeaveFormDatePickerIcon>
            </S.ApplyLeaveFormDatePickerWrap>
            <S.ApplyLeaveFormTimeInputWrap>
              <S.ApplyLeaveFormTimeInput
                placeholder="0 ~ 23"
                value={leaveData.endTimeHour}
                name="endTimeHour"
                onChange={handleLeaveData}
              />
              :
              <S.ApplyLeaveFormTimeInput
                placeholder="0 ~ 59"
                value={leaveData.endTimeMinute}
                name="endTimeMinute"
                onChange={handleLeaveData}
              />
            </S.ApplyLeaveFormTimeInputWrap>
          </S.ApplyLeaveFormColumnWrap>
          <S.ApplyLeaveFormNoticeText>
            ※시간은 24시간 형태로 작성해야합니다.
          </S.ApplyLeaveFormNoticeText>
          <TextArea
            width={315}
            height={65}
            onChange={handleLeaveDataReason}
            placeHolder="사유를 입력해주세요."
            textMaxLength={50}
            text={leaveData.reason}
            textAreaFontSize={12}
            customStyle={{ fontSize: 12, marginTop: 3 }}
          />
          <S.ApplyLeaveFormNoticeText>
            ※학생 관리자를 포함한 서비스 관리자가 해당 정보를 볼 수 있습니다.
          </S.ApplyLeaveFormNoticeText>
        </>
      )}
    </S.ApplyLeaveFormContainer>
  );
};

export default ApplyLeaveForm;
