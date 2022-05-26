import React from "react";
import { StudyRoom } from "../../../../../types/studyRoom/studyRoom.type";
import {
  ApplyStudyRoomSelectTime,
  ApplyStudyRoomSelectTitle,
  ApplyStudyRoomSelectTitleWrap,
  ApplyStudyRoomSelectWrap,
  ApplyStudyRoomSelectInput,
} from "./style";

interface Props {
  timeTitle: string;
  time: string;
  myApplyStudyRoom: StudyRoom | null;
  studyRoomsData: StudyRoom[];
}

const ApplyStudyRoomSelect = ({
  timeTitle,
  time,
  myApplyStudyRoom,
  studyRoomsData,
}: Props) => {
  return (
    <ApplyStudyRoomSelectWrap>
      <ApplyStudyRoomSelectTitleWrap>
        <ApplyStudyRoomSelectTitle>{timeTitle}</ApplyStudyRoomSelectTitle>
        <ApplyStudyRoomSelectTime>{time}</ApplyStudyRoomSelectTime>
      </ApplyStudyRoomSelectTitleWrap>
      <ApplyStudyRoomSelectInput>
        {myApplyStudyRoom === null && (
          <option key={`${timeTitle} 선택안됨`} disabled hidden selected>
            선택해주세요
          </option>
        )}
        {studyRoomsData?.map((room) => (
          <option
            key={`${timeTitle} ${room.name}`}
            selected={room.idx === myApplyStudyRoom?.idx}
          >
            {room.name}
          </option>
        ))}
      </ApplyStudyRoomSelectInput>
    </ApplyStudyRoomSelectWrap>
  );
};

export default React.memo(ApplyStudyRoomSelect);
