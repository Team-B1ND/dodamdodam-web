import React from "react";
import { ApplyLeave } from "../../../../../types/leave/leave.type";
import * as S from "./style";
import {
  TextArea,
  DatePicker,
} from "@team-b1nd/dodamdodam_web_component_library";

interface Props {
  isFold: boolean;
  leaveData: ApplyLeave;
  handleLeaveData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLeaveDataReason: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleLeaveDataDate: (e: Date, scope: "start" | "end") => void;
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
              <DatePicker
                itemKey="startDatePicker"
                width={137}
                height={32}
                customStyle={{
                  fontSize: 16,
                }}
                onChange={(e) => handleLeaveDataDate(e, "start")}
                value={leaveData.startTimeDate}
                splitCharacter={"-"}
              />
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
              <DatePicker
                itemKey="endDatePicker"
                width={137}
                height={32}
                customStyle={{
                  fontSize: 16,
                }}
                onChange={(e) => handleLeaveDataDate(e, "end")}
                value={leaveData.endTimeDate}
                splitCharacter={"-"}
              />
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
