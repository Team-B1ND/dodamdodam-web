import { Schedule } from "@src/types/schedule/schedule.type";
import * as S from "./style";

interface Props {
  data: Schedule;
}

const TodayScheduleItem = ({ data }: Props) => {
  return (
    <S.TodayScheduleItemContainer>
      <S.TodayScheduleItemTitle>{data.name}</S.TodayScheduleItemTitle>
      <S.TodayScheduleItemTargetWrap>
        <S.TodayScheduleItemTargetCategory>
          대상 :
        </S.TodayScheduleItemTargetCategory>
        <S.TodayScheduleItemTargetText>
          {data.target}
        </S.TodayScheduleItemTargetText>
      </S.TodayScheduleItemTargetWrap>
    </S.TodayScheduleItemContainer>
  );
};

export default TodayScheduleItem;
