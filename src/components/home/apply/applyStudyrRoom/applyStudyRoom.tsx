import { Button, Dropdown } from "@team-b1nd/dodamdodam_web_component_library";
import dayjs from "dayjs";
import useApplyStudyRoom from "../../../../hooks/apply/useApplyStudyRoom";
import dateTransform from "../../../../util/transform/dateTransform";
import ApplyStudyRoomVoid from "./applyStudyRoomVoid/applyStudyRoomVoid";
import {
  ApplyStudyRoomContainer,
  ApplyStudyRoomInputLabelTime,
  ApplyStudyRoomInputLabelTitle,
  ApplyStudyRoomInputLabelWrap,
  ApplyStudyRoomInputWrap,
} from "./style";

const ApplyStudyRoom = () => {
  const {
    timeTables,
    isDefault,
    myApplyStudyRooms,
    studyRoomsData,
    studyRoomsDataIsLoading,
    handleStudyRoomApply,
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
            {timeTables?.map((timeTable, idx) => {
              const handleStartTime = dayjs(
                `${dateTransform.hyphen()} ${timeTable.startTime}`
              ).format("YYYY-MM-DD HH:mm");

              const isAfter = dayjs(dateTransform.fullDate()).isAfter(
                handleStartTime,
                "minutes"
              );

              return (
                <Dropdown
                  itemkey={timeTable.name}
                  disabled={isAfter}
                  disabledItem={"시간대가 지났습니다"}
                  withDefault={true}
                  defaultItem={
                    studyRoomsData?.find(
                      (room) => room.id === myApplyStudyRooms[idx]?.placeId
                    )?.name || "선택해주세요"
                  }
                  name={String(timeTable.id)}
                  items={studyRoomsData!}
                  onChange={handleStudyRoomApply}
                  itemsValuePath={"name"}
                  key={`applyStudyRoomSelect ${timeTable.name}`}
                  label={
                    <ApplyStudyRoomInputLabelWrap>
                      <ApplyStudyRoomInputLabelTitle>
                        {timeTable.name}
                      </ApplyStudyRoomInputLabelTitle>
                      <ApplyStudyRoomInputLabelTime>
                        {timeTable.startTime} ~ {timeTable.endTime}
                      </ApplyStudyRoomInputLabelTime>
                    </ApplyStudyRoomInputLabelWrap>
                  }
                />
              );
            })}
          </ApplyStudyRoomInputWrap>
          <Button
            width={110}
            height={35}
            type="primary"
            onClick={
              isDefault ? submitDefaultSutdyRoom : submitApplyStudyRoomData
            }
            customStyle={{
              fontSize: 14,
              margin: 16,
              marginLeft: "auto",
              marginTop: "auto",
            }}
          >
            {isDefault ? "기본위치로 신청" : "수정"}
          </Button>
        </>
      )}
    </ApplyStudyRoomContainer>
  );
};

export default ApplyStudyRoom;
