import React from "react";
import {
  StudyRoom,
  validApplyStudyRoom,
} from "../../../../../types/studyRoom/studyRoom.type";
import dateTransform from "../../../../../util/date/dateTransform";
import {
  ApplyStudyRoomSelectTime,
  ApplyStudyRoomSelectTitle,
  ApplyStudyRoomSelectTitleWrap,
  ApplyStudyRoomSelectWrap,
  ApplyStudyRoomSelectInput,
} from "./style";
import dayjs from "dayjs";

interface Props {
  applyStudyRoomIdx: number;
  timeTitle: string;
  time: string;
  timeOut: string;
  myApplyStudyRoom: validApplyStudyRoom;
  studyRoomsData: StudyRoom[];
  handleApplyStudyRoomData: (
    e: React.ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => void;
}

const ApplyStudyRoomSelect = ({
  applyStudyRoomIdx,
  timeTitle,
  time,
  timeOut,
  myApplyStudyRoom,
  studyRoomsData,
  handleApplyStudyRoomData,
}: Props) => {
  const validTimeOut = `${dateTransform.hyphen()} ${timeOut}`;
  const isAfter = dayjs(validTimeOut).isBefore(dateTransform.hyphen());

  return (
    <ApplyStudyRoomSelectWrap>
      <ApplyStudyRoomSelectTitleWrap>
        <ApplyStudyRoomSelectTitle>{timeTitle}</ApplyStudyRoomSelectTitle>
        <ApplyStudyRoomSelectTime>{time}</ApplyStudyRoomSelectTime>
      </ApplyStudyRoomSelectTitleWrap>
      <ApplyStudyRoomSelectInput
        onChange={(e) => handleApplyStudyRoomData(e, applyStudyRoomIdx)}
        disabled={isAfter}
      >
        {myApplyStudyRoom?.applyStudyData === null && (
          <>
            {isAfter ? (
              <option key={`${timeTitle} 시간 지남`} disabled hidden selected>
                시간대가 지났습니다
              </option>
            ) : (
              <option key={`${timeTitle} 선택안됨`} hidden selected>
                선택해주세요
              </option>
            )}
          </>
        )}
        {studyRoomsData?.map((room) => (
          <option
            key={`${timeTitle} ${room.name}`}
            selected={room.idx === myApplyStudyRoom?.applyStudyData?.idx}
          >
            {room.name}
          </option>
        ))}
      </ApplyStudyRoomSelectInput>
    </ApplyStudyRoomSelectWrap>
  );
};

export default React.memo(ApplyStudyRoomSelect);
