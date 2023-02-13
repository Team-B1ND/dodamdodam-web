import usePoint from "../../../../hooks/point/usePoint";
import { useRecoilValue } from "recoil";
import { pointViewTypeAtom } from "../../../../store/point/pointStore";
import * as S from "./style";

const PointDashBoard = () => {
  const isDormitoryPointView = useRecoilValue(pointViewTypeAtom);
  const { schoolPoint, dormitoryPoint } = usePoint();

  return (
    <>
      <S.PointDashBoardContainer>
        <S.PointDashBoardGraphText>
          {isDormitoryPointView
            ? dormitoryPoint.dormitoryBonusPoint
            : schoolPoint.schoolBonusPoint}
          점
        </S.PointDashBoardGraphText>
        <S.PointDashBoardGraph
          point={
            isDormitoryPointView
              ? dormitoryPoint.dormitoryBonusPoint
              : schoolPoint.schoolBonusPoint
          }
          isBonusPoint={true}
        />
      </S.PointDashBoardContainer>
      <S.PointDashBoardContainer>
        <S.PointDashBoardGraphText>
          {isDormitoryPointView
            ? dormitoryPoint.dormitoryMinusPoint
            : schoolPoint.schoolMinusPoint}
          점
        </S.PointDashBoardGraphText>
        <S.PointDashBoardGraph
          point={
            isDormitoryPointView
              ? dormitoryPoint.dormitoryMinusPoint
              : schoolPoint.schoolMinusPoint
          }
          isBonusPoint={false}
        />
      </S.PointDashBoardContainer>
    </>
  );
};

export default PointDashBoard;
