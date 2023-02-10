import usePoint from "../../../hooks/point/usePoint";
import CardTitle from "../../common/CardTitle";
import * as S from "./style";

import PointChartIcon from "../../../assets/icons/point/pointChart.png";

const Point = () => {
  const { isDormitoryView, onChangeView, schoolPoint, dormitoryPoint } =
    usePoint();

  return (
    <S.PointContainer>
      <CardTitle
        title="나의 상벌점 현황"
        titleIcon={PointChartIcon}
        redirectURL={"http://dodam.b1nd.com/myinfo/mypointdetail"}
      />
      <S.PointWrap>
        <S.PointLeftWrap>
          <>
            <S.PointGraphWrap>
              <S.PointGraphPointText>
                {isDormitoryView
                  ? dormitoryPoint.dormitoryBonusPoint
                  : schoolPoint.schoolBonusPoint}
                점
              </S.PointGraphPointText>
              <S.PointGraph
                point={
                  isDormitoryView
                    ? dormitoryPoint.dormitoryBonusPoint
                    : schoolPoint.schoolBonusPoint
                }
                isBonusPoint={true}
              />
            </S.PointGraphWrap>
            <S.PointGraphWrap>
              <S.PointGraphPointText>
                {isDormitoryView
                  ? dormitoryPoint.dormitoryMinusPoint
                  : schoolPoint.schoolMinusPoint}
                점
              </S.PointGraphPointText>
              <S.PointGraph
                point={
                  isDormitoryView
                    ? dormitoryPoint.dormitoryMinusPoint
                    : schoolPoint.schoolMinusPoint
                }
                isBonusPoint={false}
              />
            </S.PointGraphWrap>
          </>
        </S.PointLeftWrap>
        <S.PointRightWrap>
          <S.PointCategoryWrap>
            <S.PointCategoryItemWrap>
              <S.PointCategoryItemCircle
                style={{ backgroundColor: "#0067bc" }}
              />
              상점
            </S.PointCategoryItemWrap>
            <S.PointCategoryItemWrap>
              <S.PointCategoryItemCircle
                style={{ backgroundColor: "#f97e6d" }}
              />
              벌점
            </S.PointCategoryItemWrap>
          </S.PointCategoryWrap>
          <S.PointChangeButton
            isSchool={isDormitoryView}
            onClick={onChangeView}
          >
            {isDormitoryView ? "기숙사" : "학교"}
          </S.PointChangeButton>
        </S.PointRightWrap>
      </S.PointWrap>
    </S.PointContainer>
  );
};

export default Point;
