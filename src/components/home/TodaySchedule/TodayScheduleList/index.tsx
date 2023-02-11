import { useGetTodayScheduleQuery } from "../../../../queries/schedule/schedule.query";
import dataCheck from "../../../../util/check/dataCheck";
import TodayScheduleItem from "../TodayScheduleItem";
import * as S from "./style";
import { TodayScheduleListVoidText } from "./style";

const TodayScheduleList = () => {
  const { data: serverTodayScheduleData } = useGetTodayScheduleQuery({
    suspense: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  return (
    <>
      {serverTodayScheduleData &&
      dataCheck.voidCheck(serverTodayScheduleData.data) ? (
        <TodayScheduleListVoidText>
          오늘 일정이 없습니다.
        </TodayScheduleListVoidText>
      ) : (
        <S.TodayScheduleListContainer>
          {serverTodayScheduleData?.data.map((schedule) => (
            <TodayScheduleItem data={schedule} key={schedule.id} />
          ))}
        </S.TodayScheduleListContainer>
      )}
    </>
  );
};
export default TodayScheduleList;
