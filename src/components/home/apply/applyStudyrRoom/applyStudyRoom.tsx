import {
  APPLY_STUDY_ROOMS_TIMETABLE_WEEKDAY,
  APPLY_STUDY_ROOMS_TIMETABLE_WEEKEND,
} from "../../../../constants/apply/apply.constant";
import useApplyStudyRoom from "../../../../hooks/apply/useApplyStudyRoom";
import dateCheck from "../../../../util/date/dateCheck";
import dateTransform from "../../../../util/date/dateTransform";
import { ApplyFormSubmitButton } from "../style";
import ApplyStudyRoomSelect from "./applyStudyRoomSelect/applyStudyRoomSelect";
import ApplyStudyRoomVoid from "./applyStudyRoomVoid/applyStudyRoomVoid";
import { ApplyStudyRoomContainer, ApplyStudyRoomInputWrap } from "./style";

const ApplyStudyRoom = () => {
  const {
    isDefault,
    validMyApplyStudyRooms,
    studyRoomsData,
    studyRoomsDataIsLoading,
    handleApplyStudyRoomData,
    submitApplyStudyRoomData,
    submitDefaultSutdyRoom,
  } = useApplyStudyRoom();

  return (
    <ApplyStudyRoomContainer>
      {studyRoomsDataIsLoading ? (
        <ApplyStudyRoomVoid />
      ) : (
        <>
          <ApplyStudyRoomInputWrap>
            {dateCheck.weekDayCheck(dateTransform.hyphen()) ? (
              <>
                {APPLY_STUDY_ROOMS_TIMETABLE_WEEKDAY.map((item, idx) => (
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
              </>
            ) : (
              <>
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
              </>
            )}
          </ApplyStudyRoomInputWrap>
          {isDefault ? (
            <ApplyFormSubmitButton onClick={submitDefaultSutdyRoom}>
              기본위치로 신청
            </ApplyFormSubmitButton>
          ) : (
            <ApplyFormSubmitButton onClick={submitApplyStudyRoomData}>
              수정
            </ApplyFormSubmitButton>
          )}
        </>
      )}
    </ApplyStudyRoomContainer>
  );
};

export default ApplyStudyRoom;
