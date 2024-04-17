import * as S from "./style";
import {
  TextArea,
  DatePicker,
  Button,
} from "@team-b1nd/dodamdodam_web_component_library";
import useApplyLeave from "@src/hooks/leave/useApplyLeave";
import ApplyNotApproveList from "../../ApplyNotApproveList";

const ApplyLeaveForm = () => {
  const {
    isFold,
    setIsFold,
    notApprovedLeaves,
    loadNotApprovedLeave,
    deleteNotApprovedLeave,
    leaveData,
    handleLeaveData,
    handleLeaveDataReason,
    handleLeaveDataDate,
    submitLeaveData,
  } = useApplyLeave();

  return (
    <>
      <ApplyNotApproveList
        fold={isFold}
        setFold={setIsFold}
        notApproveItems={notApprovedLeaves}
        loadNotApprovedItem={loadNotApprovedLeave}
        deleteNotApprovedItem={deleteNotApprovedLeave}
      />
      <S.ApplyLeaveFormContainer isFold={isFold}>
        {!isFold && notApprovedLeaves.length === 0 ? (
          <>수정할 외박 정보가 없습니다.</>
        ) : (
          <>
            <S.ApplyLeaveFormColumnWrap style={{ marginBottom: 10 }}>
              <S.ApplyLeaveFormColumnTitle>
                출발 일자
              </S.ApplyLeaveFormColumnTitle>
              <S.ApplyLeaveFormInputWrap>
                <S.ApplyLeaveFormDatePickerWrap>
                  <DatePicker
                    itemKey="startDatePicker"
                    width={222}
                    height={32}
                    customStyle={{
                      fontSize: 16,
                    }}
                    onChange={(e) => handleLeaveDataDate(e, "start")}
                    value={leaveData.startTimeDate}
                    splitCharacter={"-"}
                  />
                </S.ApplyLeaveFormDatePickerWrap>
              </S.ApplyLeaveFormInputWrap>
            </S.ApplyLeaveFormColumnWrap>
            <S.ApplyLeaveFormColumnWrap style={{ marginBottom: 5 }}>
              <S.ApplyLeaveFormColumnTitle>
                도착 일자
              </S.ApplyLeaveFormColumnTitle>
              <S.ApplyLeaveFormInputWrap>
                <S.ApplyLeaveFormDatePickerWrap>
                  <DatePicker
                    itemKey="endDatePicker"
                    width={222}
                    height={32}
                    customStyle={{
                      fontSize: 16,
                    }}
                    onChange={(e) => handleLeaveDataDate(e, "end")}
                    value={leaveData.endTimeDate}
                    splitCharacter={"-"}
                  />
                </S.ApplyLeaveFormDatePickerWrap>
              </S.ApplyLeaveFormInputWrap>
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
      {!(notApprovedLeaves?.length === 0 && !isFold) && (
        <Button
          width={110}
          height={35}
          type="primary"
          onClick={submitLeaveData}
          customStyle={{
            fontSize: 14,
            margin: 16,
            marginLeft: "auto",
            marginTop: "auto",
            minHeight: 35,
          }}
        >
          {isFold ? "신청" : "수정"}
        </Button>
      )}
    </>
  );
};

export default ApplyLeaveForm;
