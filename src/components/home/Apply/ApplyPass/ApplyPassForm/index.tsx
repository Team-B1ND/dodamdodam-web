import * as S from "./style";
import {
  Button,
  DatePicker,
  TextArea,
} from "@team-b1nd/dodamdodam_web_component_library";
import useApplyPass from "@src/hooks/pass/useApplyPass";
import ApplyNotApproveList from "../../ApplyNotApproveList";
import ApplyPassModal from "../ApplyPassModal";

const ApplyPassForm = () => {
  const {
    closeModal,
    isOpen,
    isFold,
    setIsFold,
    notApprovedPasses,
    loadNotApprovedPass,
    deleteNotApprovedPass,
    passData,
    handlePassData,
    handlePassDataReason,
    passDataDate,
    handlePassDataDate,
    submitPassData,
  } = useApplyPass();

  return (
    <>
      <ApplyNotApproveList
        fold={isFold}
        setFold={setIsFold}
        notApproveItems={notApprovedPasses}
        loadNotApprovedItem={loadNotApprovedPass}
        deleteNotApprovedItem={deleteNotApprovedPass}
      />
      <S.ApplyPassFormContainer isFold={isFold}>
        {!isFold && notApprovedPasses.length === 0 ? (
          <>수정할 외출 정보가 없습니다.</>
        ) : (
          <>
            <S.ApplyPassFormColumnWrap style={{ marginBottom: 16 }}>
              <S.ApplyPassFormColumnTitle>신청 일자</S.ApplyPassFormColumnTitle>
              <S.ApplyPassFormInputWrap>
                <S.ApplyPassFormDatePickerWrap>
                  <DatePicker
                    itemKey="datePicker"
                    width={222}
                    height={32}
                    customStyle={{ fontSize: 16 }}
                    onChange={handlePassDataDate}
                    value={passDataDate}
                    splitCharacter={"-"}
                  />
                </S.ApplyPassFormDatePickerWrap>
              </S.ApplyPassFormInputWrap>
            </S.ApplyPassFormColumnWrap>
            <S.ApplyPassFormColumnWrap style={{ marginBottom: 5 }}>
              <S.ApplyPassFormColumnTitle>외출 시간</S.ApplyPassFormColumnTitle>
              <S.ApplyPassFormInputWrap>
                <S.ApplyPassFormTimeInputWrap>
                  <S.ApplyPassFormTimeInput
                    placeholder="0 ~ 23"
                    value={passData.startTimeHour}
                    name="startTimeHour"
                    onChange={handlePassData}
                  />
                  :
                  <S.ApplyPassFormTimeInput
                    placeholder="0 ~ 59"
                    value={passData.startTimeMinute}
                    name="startTimeMinute"
                    onChange={handlePassData}
                  />
                </S.ApplyPassFormTimeInputWrap>
                <S.ApplyPassFormTimeInputTilde>~</S.ApplyPassFormTimeInputTilde>
                <S.ApplyPassFormTimeInputWrap>
                  <S.ApplyPassFormTimeInput
                    placeholder="0 ~ 23"
                    value={passData.endTimeHour}
                    name="endTimeHour"
                    onChange={handlePassData}
                  />
                  :
                  <S.ApplyPassFormTimeInput
                    placeholder="0 ~ 59"
                    value={passData.endTimeMinute}
                    name="endTimeMinute"
                    onChange={handlePassData}
                  />
                </S.ApplyPassFormTimeInputWrap>
              </S.ApplyPassFormInputWrap>
            </S.ApplyPassFormColumnWrap>
            <S.ApplyPassFormNoticeText>
              ※시간은 24시간 형태로 작성해야합니다.
            </S.ApplyPassFormNoticeText>
            <TextArea
              width={315}
              height={65}
              onChange={handlePassDataReason}
              placeHolder="사유를 입력해주세요."
              textMaxLength={50}
              text={passData.reason}
              textAreaFontSize={12}
              customStyle={{ fontSize: 12, marginTop: 3 }}
            />
            <S.ApplyPassFormNoticeText>
              ※학생 관리자를 포함한 서비스 관리자가 해당 정보를 볼 수 있습니다.
            </S.ApplyPassFormNoticeText>
          </>
        )}
      </S.ApplyPassFormContainer>

      {!(notApprovedPasses.length === 0 && !isFold) && (
        <Button
          width={110}
          height={35}
          type="primary"
          onClick={submitPassData}
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
       <ApplyPassModal
        width="500px"
        height="300px"
        zIndex={1000}
        isOpen={isOpen}
        close={closeModal}
        submitData={passData}
        passDataDate={passDataDate}
      />
    </>
  );
};

export default ApplyPassForm;
