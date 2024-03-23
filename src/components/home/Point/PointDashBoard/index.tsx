import { useRecoilValue } from "recoil";
import { pointViewTypeAtom } from "@src/store/point/pointStore";
import * as S from "./style";
import { useGetMyPointQuery } from "@src/queries/point/point.query";
import { PointType } from "@src/repository/point/point.param";

const PointDashBoard = () => {
  const isDormitoryPointView = useRecoilValue(pointViewTypeAtom);

  const { data: serverMyPointData } = useGetMyPointQuery(
    { type: isDormitoryPointView as PointType },
    {
      suspense: true,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 60,
    }
  );
  return (
    <>
      <S.PointDashBoardContainer>
        <S.PointDashBoardGraphText>
          {serverMyPointData?.data.bonus}점
        </S.PointDashBoardGraphText>
        <S.PointDashBoardGraph
          point={serverMyPointData?.data.bonus!}
          isBonusPoint={true}
        />
      </S.PointDashBoardContainer>
      <S.PointDashBoardContainer>
        <S.PointDashBoardGraphText>
          {serverMyPointData?.data.minus} 점
        </S.PointDashBoardGraphText>
        <S.PointDashBoardGraph
          point={serverMyPointData?.data.minus!}
          isBonusPoint={false}
        />
      </S.PointDashBoardContainer>
    </>
  );
};

export default PointDashBoard;
