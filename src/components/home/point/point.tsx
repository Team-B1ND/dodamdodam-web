import { useState } from "react";
import { FcRules } from "react-icons/fc";
import usePoint from "../../../hooks/point/usePoint";
import CardTitle from "../../common/cardTitle/cardTitle";
import {
  PointCategoryItemCircle,
  PointCategoryItemWrap,
  PointCategoryWrap,
  PointChangeButton,
  PointContainer,
  PointGraph,
  PointGraphPointText,
  PointGraphWrap,
  PointLeftWrap,
  PointRightWrap,
  PointWrap,
} from "./style";

const Point = () => {
  const { schoolPoint, dormitoryPoint } = usePoint();
  const [isMeritView, setIsMeritView] = useState(true); // true은 기숙사, false은 학교
  console.log(schoolPoint, dormitoryPoint);

  return (
    <PointContainer>
      <CardTitle
        title="나의 상벌점 현황"
        titleIcon={<FcRules />}
        redirectURL={"http://dodam.b1nd.com/dormitory-point"}
      />
      <PointWrap>
        <PointLeftWrap>
          {isMeritView ? (
            <>
              <PointGraphWrap>
                <PointGraphPointText>
                  {dormitoryPoint.dormitoryMerit}점
                </PointGraphPointText>
                <PointGraph
                  point={dormitoryPoint.dormitoryMerit}
                  isMerit={true}
                />
              </PointGraphWrap>
              <PointGraphWrap>
                <PointGraphPointText>
                  {dormitoryPoint.dormitoryDemerit}점
                </PointGraphPointText>
                <PointGraph
                  point={dormitoryPoint.dormitoryDemerit}
                  isMerit={false}
                />
              </PointGraphWrap>
            </>
          ) : (
            <>
              <PointGraphWrap>
                <PointGraphPointText>
                  {schoolPoint.schoolMerit}점
                </PointGraphPointText>
                <PointGraph point={schoolPoint.schoolMerit} isMerit={true} />
              </PointGraphWrap>
              <PointGraphWrap>
                <PointGraphPointText>
                  {schoolPoint.schoolDemerit}점
                </PointGraphPointText>
                <PointGraph point={schoolPoint.schoolDemerit} isMerit={false} />
              </PointGraphWrap>
            </>
          )}
        </PointLeftWrap>
        <PointRightWrap>
          <PointCategoryWrap>
            <PointCategoryItemWrap>
              <PointCategoryItemCircle style={{ backgroundColor: "#0067bc" }} />
              상점
            </PointCategoryItemWrap>
            <PointCategoryItemWrap>
              <PointCategoryItemCircle style={{ backgroundColor: "#f97e6d" }} />
              벌점
            </PointCategoryItemWrap>
          </PointCategoryWrap>
          <PointChangeButton
            isSchool={isMeritView}
            onClick={() => setIsMeritView((prev) => !prev)}
          >
            {isMeritView ? "기숙사" : "학교"}
          </PointChangeButton>
        </PointRightWrap>
      </PointWrap>
    </PointContainer>
  );
};

export default Point;
