import { useMemo } from "react";
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
  const { myApplyStudyRooms, studyRoomsData, studyRoomsDataIsLoading } =
    useApplyStudyRoom();

  //컴포넌트 쪽에서 map을 돌려야 하기 때문에 리스트로 변환
  const myApplyStudyRoomList = useMemo(() => {
    const { 1: place1, 2: place2, 3: place3, 4: place4 } = myApplyStudyRooms;

    return [place1, place2, place3, place4];
  }, [myApplyStudyRooms]);

  return (
    <ApplyStudyRoomContainer>
      {studyRoomsDataIsLoading ? (
        <ApplyStudyRoomVoid />
      ) : (
        <>
          <ApplyStudyRoomInputWrap>
            {APPLY_STUDY_ROOMS_TIMETABLE.map((item, idx) => (
              <ApplyStudyRoomSelect
                timeTitle={item.timeTitle}
                time={item.time}
                myApplyStudyRoom={myApplyStudyRoomList[idx]}
                studyRoomsData={studyRoomsData!}
              />
            ))}
          </ApplyStudyRoomInputWrap>
          <ApplyStudyRoomSubmitButton>수정</ApplyStudyRoomSubmitButton>
        </>
      )}
    </ApplyStudyRoomContainer>
  );
};

export default ApplyStudyRoom;
