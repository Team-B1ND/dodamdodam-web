import { FcSurvey } from "react-icons/fc";
import { STUDY_ROOM_ITEMS } from "../../../constants/studyRoom/studyRoom.constant";
import useStudyRoom from "../../../hooks/studyRoom/useStudyRoom";
import {
  StudyRoomContainer,
  StudyRoomTitleIcon,
  StudyRoomTitleItem,
  StudyRoomTitleItemWrap,
  StudyRoomTitleText,
  StudyRoomTitleWrap,
} from "./style";

const StudyRoom = () => {
  const { section, setSection } = useStudyRoom();

  return (
    <StudyRoomContainer>
      <StudyRoomTitleWrap>
        <StudyRoomTitleIcon>
          <FcSurvey />
        </StudyRoomTitleIcon>
        <StudyRoomTitleText>신청</StudyRoomTitleText>
        <StudyRoomTitleItemWrap>
          {STUDY_ROOM_ITEMS.map((item) => (
            <StudyRoomTitleItem
              isSelect={section === item}
              onClick={() => setSection(item)}
            >
              <span>{item}</span>
            </StudyRoomTitleItem>
          ))}
        </StudyRoomTitleItemWrap>
      </StudyRoomTitleWrap>
    </StudyRoomContainer>
  );
};

export default StudyRoom;
