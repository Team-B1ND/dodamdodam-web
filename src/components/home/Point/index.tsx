import CardTitle from "@src/components/common/CardTitle";
import * as S from "./style";
import PointChartIcon from "@src/assets/icons/point/pointChart.png";
import { useRecoilState } from "recoil";
import { pointViewTypeAtom } from "@src/store/point/pointStore";
import { usePostModuleLogMutation } from "@src/queries/log/log.query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import PointDashBoard from "./PointDashBoard";
import PointDashBoardFallbackLoader from "@src/components/common/FallbackLoader/PointDashBoard";
import ErrorFallback from "@src/components/common/ErrorFallback";

const Point = () => {
  const [isDormitoryPointView, setIsDormitoryPointView] =
    useRecoilState(pointViewTypeAtom);

  const postModuleLogMutation = usePostModuleLogMutation();

  const onChangeView = () => {
    setIsDormitoryPointView((prev) => {
      if (prev) {
        postModuleLogMutation.mutate({
          moduleName: "메인/상벌점",
          description: "기숙사 상벌점 조회",
        });
      } else {
        postModuleLogMutation.mutate({
          moduleName: "메인/상벌점",
          description: "학교 상벌점 조회",
        });
      }

      return !prev;
    });
  };

  return (
    <S.PointContainer>
      <CardTitle
        title="나의 상벌점 현황"
        titleIcon={PointChartIcon}
        redirectURL={"http://dodam.b1nd.com/myinfo/mypointdetail"}
      />
      <S.PointWrap>
        <S.PointLeftWrap>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<PointDashBoardFallbackLoader />}>
              <PointDashBoard />
            </Suspense>
          </ErrorBoundary>
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
            isDormitory={isDormitoryPointView}
            onClick={onChangeView}
          >
            {isDormitoryPointView ? "기숙사" : "학교"}
          </S.PointChangeButton>
        </S.PointRightWrap>
      </S.PointWrap>
    </S.PointContainer>
  );
};

export default Point;
