import { Schedule } from "types/schedule/schedule.type";
import {
  TodayScheduleItemContainer,
  TodayScheduleItemTargetCategory,
  TodayScheduleItemTargetText,
  TodayScheduleItemTargetWrap,
  TodayScheduleItemTitle,
} from "./style";

interface Props {
  data: Schedule;
}

const TodayScheduleItem = ({ data }: Props) => {
  return (
    <TodayScheduleItemContainer>
      <TodayScheduleItemTitle>{data.name}</TodayScheduleItemTitle>
      <TodayScheduleItemTargetWrap>
        <TodayScheduleItemTargetCategory>
          대상 :
        </TodayScheduleItemTargetCategory>
        <TodayScheduleItemTargetText>{data.target}</TodayScheduleItemTargetText>
      </TodayScheduleItemTargetWrap>
    </TodayScheduleItemContainer>
  );
};

export default TodayScheduleItem;
