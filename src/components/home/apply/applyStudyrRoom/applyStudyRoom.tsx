import {
  APPLY_STUDY_ROOMS_TIMETABLE_WEEKDAY,
  APPLY_STUDY_ROOMS_TIMETABLE_WEEKEND,
} from "../../../../constants/apply/apply.constant";
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
    submitApplyStudyRoomData,
  } = useApplyStudyRoom();

  return (
    <ApplyStudyRoomContainer>
      {studyRoomsDataIsLoading ? (
        <ApplyStudyRoomVoid />
      ) : (
        <>
          <ApplyStudyRoomInputWrap>
            {APPLY_STUDY_ROOMS_TIMETABLE_WEEKEND.map((item, idx) => (
              <ApplyStudyRoomSelect
                applyStudyRoomIdx={item.timeTableIdx}
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
            <ApplyStudyRoomSubmitButton onClick={submitApplyStudyRoomData}>
              수정
            </ApplyStudyRoomSubmitButton>
          )}
        </>
      )}
    </ApplyStudyRoomContainer>
  );
};

export default ApplyStudyRoom;
