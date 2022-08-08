import { Button, Dropdown } from "@team-b1nd/dodamdodam_web_component_library";
import dayjs from "dayjs";
import {
  APPLY_STUDY_ROOMS_TIMETABLE_WEEKDAY,
  APPLY_STUDY_ROOMS_TIMETABLE_WEEKEND,
} from "../../../../constants/apply/apply.constant";
import useApplyStudyRoom from "../../../../hooks/apply/useApplyStudyRoom";
import dateCheck from "../../../../util/date/dateCheck";
import dateTransform from "../../../../util/date/dateTransform";
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
                {APPLY_STUDY_ROOMS_TIMETABLE_WEEKDAY.map((item, idx) => {
                  const validTimeOut = dayjs(
                    `${dateTransform.hyphen()} ${item.timeOut}`
                  ).format("YYYY-MM-DD HH:mm");

                  const isAfter = dayjs(dateTransform.fullDate()).isAfter(
                    validTimeOut,
                    "minutes"
                  );

                  return (
                    <Dropdown
                      itemkey={item.timeTitle}
                      disabled={isAfter}
                      disabledItem={"시간대가 지났습니다"}
                      withDefault={true}
                      defaultItem={
                        studyRoomsData?.filter(
                          (room) =>
                            room.idx ===
                            validMyApplyStudyRooms[idx]?.applyStudyData?.idx
                        )[0]?.name || "선택해주세요"
                      }
                      name={String(item.timeTableIdx)}
                      items={studyRoomsData!}
                      onChange={handleApplyStudyRoomData}
                      itemsValuePath={"name"}
                      key={`applyStudyRoomSelect ${item.timeTitle}`}
                      label={
                        <ApplyStudyRoomInputLabelWrap>
                          <ApplyStudyRoomInputLabelTitle>
                            {item.timeTitle}
                          </ApplyStudyRoomInputLabelTitle>
                          <ApplyStudyRoomInputLabelTime>
                            {item.time}
                          </ApplyStudyRoomInputLabelTime>
                        </ApplyStudyRoomInputLabelWrap>
                      }
                    />
                  );
                })}
              </>
            ) : (
              <>
                {APPLY_STUDY_ROOMS_TIMETABLE_WEEKEND.map((item, idx) => {
                  const validTimeOut = dayjs(
                    `${dateTransform.hyphen()} ${item.timeOut}`
                  ).format("YYYY-MM-DD HH:mm");

                  const isAfter = dayjs(dateTransform.fullDate()).isAfter(
                    validTimeOut,
                    "minutes"
                  );

                  return (
                    <Dropdown
                      itemkey={item.timeTitle}
                      disabled={isAfter}
                      disabledItem={"시간대가 지났습니다"}
                      withDefault={true}
                      defaultItem={
                        studyRoomsData?.filter(
                          (room) =>
                            room.idx ===
                            validMyApplyStudyRooms[idx]?.applyStudyData?.idx
                        )[0]?.name || "선택해주세요"
                      }
                      name={String(item.timeTableIdx)}
                      items={studyRoomsData!}
                      onChange={handleApplyStudyRoomData}
                      itemsValuePath={"name"}
                      key={`applyStudyRoomSelect ${item.timeTitle}`}
                      label={
                        <ApplyStudyRoomInputLabelWrap>
                          <ApplyStudyRoomInputLabelTitle>
                            {item.timeTitle}
                          </ApplyStudyRoomInputLabelTitle>
                          <ApplyStudyRoomInputLabelTime>
                            {item.time}
                          </ApplyStudyRoomInputLabelTime>
                        </ApplyStudyRoomInputLabelWrap>
                      }
                    />
                  );
                })}
              </>
            )}
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
