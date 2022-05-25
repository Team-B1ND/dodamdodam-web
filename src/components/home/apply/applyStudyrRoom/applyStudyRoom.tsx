import useApplyStudyRoom from "../../../../hooks/apply/useApplyStudyRoom";
import {
  ApplyStudyRoomContainer,
  ApplyStudyRoomInput,
  ApplyStudyRoomInputColumnWrap,
  ApplyStudyRoomInputRowWrap,
  ApplyStudyRoomInputTime,
  ApplyStudyRoomInputTitle,
  ApplyStudyRoomInputTitleWrap,
  ApplyStudyRoomInputWrap,
  ApplyStudyRoomSubmitButton,
} from "./style";

const ApplyStudyRoom = () => {
  const { studyRoomsData } = useApplyStudyRoom();

  console.log(studyRoomsData);

  return (
    <ApplyStudyRoomContainer>
      <ApplyStudyRoomInputWrap>
        <ApplyStudyRoomInputRowWrap>
          <ApplyStudyRoomInputColumnWrap>
            <ApplyStudyRoomInputTitleWrap>
              <ApplyStudyRoomInputTitle>8교시</ApplyStudyRoomInputTitle>
              <ApplyStudyRoomInputTime>17:00 ~ 17:20</ApplyStudyRoomInputTime>
            </ApplyStudyRoomInputTitleWrap>
            <ApplyStudyRoomInput>
              {studyRoomsData?.map((room) => (
                <option>{room.name}</option>
              ))}
            </ApplyStudyRoomInput>
          </ApplyStudyRoomInputColumnWrap>
          <ApplyStudyRoomInputColumnWrap>
            <ApplyStudyRoomInputTitleWrap>
              <ApplyStudyRoomInputTitle>9교시</ApplyStudyRoomInputTitle>
              <ApplyStudyRoomInputTime>17:30 ~ 18:20</ApplyStudyRoomInputTime>
            </ApplyStudyRoomInputTitleWrap>
            <ApplyStudyRoomInput>
              {studyRoomsData?.map((room) => (
                <option>{room.name}</option>
              ))}
            </ApplyStudyRoomInput>
          </ApplyStudyRoomInputColumnWrap>
        </ApplyStudyRoomInputRowWrap>
        <ApplyStudyRoomInputRowWrap>
          <ApplyStudyRoomInputColumnWrap>
            <ApplyStudyRoomInputTitleWrap>
              <ApplyStudyRoomInputTitle>10교시</ApplyStudyRoomInputTitle>
              <ApplyStudyRoomInputTime>19:10 ~ 20:00</ApplyStudyRoomInputTime>
            </ApplyStudyRoomInputTitleWrap>
            <ApplyStudyRoomInput>
              {studyRoomsData?.map((room) => (
                <option>{room.name}</option>
              ))}
            </ApplyStudyRoomInput>
          </ApplyStudyRoomInputColumnWrap>
          <ApplyStudyRoomInputColumnWrap>
            <ApplyStudyRoomInputTitleWrap>
              <ApplyStudyRoomInputTitle>11교시</ApplyStudyRoomInputTitle>
              <ApplyStudyRoomInputTime>20:10 ~ 21:00</ApplyStudyRoomInputTime>
            </ApplyStudyRoomInputTitleWrap>
            <ApplyStudyRoomInput>
              {studyRoomsData?.map((room) => (
                <option>{room.name}</option>
              ))}
            </ApplyStudyRoomInput>
          </ApplyStudyRoomInputColumnWrap>
        </ApplyStudyRoomInputRowWrap>
      </ApplyStudyRoomInputWrap>
      <ApplyStudyRoomSubmitButton>수정</ApplyStudyRoomSubmitButton>
    </ApplyStudyRoomContainer>
  );
};

export default ApplyStudyRoom;
