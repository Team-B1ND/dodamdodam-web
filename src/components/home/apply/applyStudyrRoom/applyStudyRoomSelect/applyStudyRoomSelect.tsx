import React from "react";
import {
  StudyRoom,
  ApplyStudyRoom,
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
  myApplyStudyRoom: ApplyStudyRoom;
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
  const validTimeOut = dayjs(`${dateTransform.hyphen()} ${timeOut}`).format(
    "YYYY-MM-DD HH:mm"
  );

  const isAfter = dayjs(dateTransform.fullDate()).isAfter(
    validTimeOut,
    "minutes"
  );

  return (
    <ApplyStudyRoomSelectWrap>
      <ApplyStudyRoomSelectTitleWrap>
        <ApplyStudyRoomSelectTitle>{timeTitle}</ApplyStudyRoomSelectTitle>
        <ApplyStudyRoomSelectTime>{time}</ApplyStudyRoomSelectTime>
      </ApplyStudyRoomSelectTitleWrap>
      <ApplyStudyRoomSelectInput
        onChange={(e) => handleApplyStudyRoomData(e, applyStudyRoomIdx)}
        disabled={isAfter}
        defaultValue={
          isAfter ? `${timeTitle} 시간지남` : `${timeTitle} 선택안됨`
        }
      >
        <option
          key={`${timeTitle} 시간지남`}
          disabled
          hidden
          value={`${timeTitle} 시간지남`}
        >
          시간대가 지났습니다
        </option>
        <option
          key={`${timeTitle} 선택안됨`}
          hidden
          selected
          value={`${timeTitle} 선택안됨`}
        >
          선택해주세요
        </option>
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
