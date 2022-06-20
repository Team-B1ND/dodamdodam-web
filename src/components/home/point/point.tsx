import usePoint from "hooks/point/usePoint";
import { useState } from "react";
import { FcRules } from "react-icons/fc";
import CardTitle from "../../common/cardTitle/cardTitle";
import {
  PointContainer,
  PointGraph,
  PointGraphWrap,
  PointLeftWrap,
  PointRightWrap,
  PointWrap,
} from "./style";

const Point = () => {
  const { schoolPoint, dormitoryPoint } = usePoint();
  const [isMeritView, setIsMeritView] = useState(true); // true은 기숙사, false은 학교

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
              <PointGraphWrap style={{}}>
                <div style={{ display: "flex", width: "35px" }}>
                  {dormitoryPoint.dormitoryMerit}점
                </div>
                <PointGraph
                  point={dormitoryPoint.dormitoryMerit}
                  isMerit={true}
                />
              </PointGraphWrap>
              <PointGraphWrap>
                <div style={{ display: "flex", width: "35px" }}>
                  {dormitoryPoint.dormitoryDemerit}점
                </div>
                <PointGraph
                  point={dormitoryPoint.dormitoryDemerit}
                  isMerit={false}
                />
              </PointGraphWrap>
            </>
          ) : (
            <>
              <PointGraphWrap>
                {schoolPoint.schoolMerit}점
                <PointGraph point={schoolPoint.schoolMerit} isMerit={true} />
              </PointGraphWrap>
              <PointGraphWrap>
                {schoolPoint.schoolDemerit}점
                <PointGraph point={schoolPoint.schoolDemerit} isMerit={false} />
              </PointGraphWrap>
            </>
          )}
        </PointLeftWrap>
        <PointRightWrap>
          <button
            style={{ display: "flex" }}
            onClick={() => setIsMeritView((prev) => !prev)}
          >
            {isMeritView ? "기숙사" : "학교"}
          </button>
        </PointRightWrap>
      </PointWrap>
    </PointContainer>
  );
};

export default Point;
