import { APPLY_STUDY_ROOMS_TIMETABLE } from "../../../../constants/apply/apply.constant";
import useApplyStudyRoom from "../../../../hooks/apply/useApplyStudyRoom";
import ApplyStudyRoomSelect from "./applyStudyRoomSelect/applyStudyRoomSelect";
import ApplyStudyRoomVoid from "./applyStudyRoomVoid/applyStudyRoomVoid";
import {
  ApplyStudyRoomContainer,
  ApplyStudyRoomInputWrap,
  ApplyStudyRoomSubmitButton,
} from "./style";

const ApplyStudyRoom = () => {
  const {
    isDefault,
    validMyApplyStudyRooms,
    studyRoomsData,
    studyRoomsDataIsLoading,
    handleApplyStudyRoomData,
  } = useApplyStudyRoom();

  return (
    <ApplyStudyRoomContainer>
      {studyRoomsDataIsLoading ? (
        <ApplyStudyRoomVoid />
      ) : (
        <>
          <ApplyStudyRoomInputWrap>
            {APPLY_STUDY_ROOMS_TIMETABLE.map((item, idx) => (
              <ApplyStudyRoomSelect
                applyStudyRoomIdx={idx + 1}
                timeTitle={item.timeTitle}
                time={item.time}
                timeOut={item.timeOut}
                myApplyStudyRoom={validMyApplyStudyRooms[idx]}
                studyRoomsData={studyRoomsData!}
                handleApplyStudyRoomData={handleApplyStudyRoomData}
                key={`applyStudyRoomSelect ${item.timeTitle}`}
              />
            ))}
          </ApplyStudyRoomInputWrap>
          {isDefault ? (
            <ApplyStudyRoomSubmitButton>
              기본위치로 신청
            </ApplyStudyRoomSubmitButton>
          ) : (
            <ApplyStudyRoomSubmitButton>수정</ApplyStudyRoomSubmitButton>
          )}
        </>
      )}
    </ApplyStudyRoomContainer>
  );
};

export default ApplyStudyRoom;
