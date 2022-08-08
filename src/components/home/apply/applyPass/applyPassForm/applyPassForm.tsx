import * as S from "./style";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import { IoMdCalendar } from "react-icons/io";
import dateTransform from "../../../../../util/date/dateTransform";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { ApplyPass } from "../../../../../types/pass/pass.type";
import { TextArea } from "@team-b1nd/dodamdodam_web_component_library";

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
    <S.ApplyPassFormContainer isFold={isFold}>
      {!isFold && notApprovePassesLength === 0 ? (
        <>수정할 외출 정보가 없습니다.</>
      ) : (
        <>
          <S.ApplyPassFormColumnWrap style={{ marginBottom: 16 }}>
            <S.ApplyPassFormColumnTitle>신청 일자</S.ApplyPassFormColumnTitle>
            <S.ApplyPassFormInputWrap>
              <S.ApplyPassFormDatePickerWrap>
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

                  <S.ApplyPassFormDatePickerIcon htmlFor="datePicker">
                    <IoMdCalendar />
                  </S.ApplyPassFormDatePickerIcon>
                </MuiPickersUtilsProvider>
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
  );
};

export default ApplyPassForm;
