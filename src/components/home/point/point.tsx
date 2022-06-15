import usePoint from "hooks/point/usePoint";
import { useState } from "react";
import { FcRules } from "react-icons/fc";
import CardTitle from "../../common/cardTitle/cardTitle";
import {
  DormitoryDemeritPointGraph,
  DormitoryMeritPointGraph,
  DormitoryPointWrap,
  PointContainer,
  SchoolDemeritPointGraph,
  SchoolMeritPointGraph,
  SchoolPointWrap,
} from "./style";

const Point = () => {
  const { schoolPoint, dormitoryPoint } = usePoint();
  const [pointView, setPointView] = useState(true); // true은 기숙사, false은 학교

  return (
    <PointContainer>
      <CardTitle
        title="나의 상벌점 현황"
        titleIcon={<FcRules />}
        redirectURL={"http://dodam.b1nd.com/dormitory-point"}
      />
      {pointView && (
        <>
          <DormitoryPointWrap style={{}}>
            <div style={{ display: "flex", width: "35px" }}>
              {dormitoryPoint.dormitoryMerit}점
            </div>
            <DormitoryMeritPointGraph point={dormitoryPoint.dormitoryMerit} />
          </DormitoryPointWrap>
          <DormitoryPointWrap>
            <div style={{ display: "flex", width: "35px" }}>
              {dormitoryPoint.dormitoryDemerit}점
            </div>
            <DormitoryDemeritPointGraph
              point={dormitoryPoint.dormitoryDemerit}
            />
          </DormitoryPointWrap>
        </>
      )}
      {!pointView && (
        <>
          <SchoolPointWrap>
            <div style={{ display: "flex" }}>{schoolPoint.schoolMerit}점</div>
            <SchoolMeritPointGraph point={schoolPoint.schoolMerit} />
          </SchoolPointWrap>
          <SchoolPointWrap>
            <div style={{ display: "flex" }}>{schoolPoint.schoolDemerit}점</div>
            <SchoolDemeritPointGraph point={schoolPoint.schoolDemerit} />
          </SchoolPointWrap>
        </>
      )}
      <button
        style={{ display: "flex" }}
        onClick={() => setPointView((prev) => !prev)}
      >
        {pointView ? "기숙사" : "학교"}
      </button>
    </PointContainer>
  );
};

export default Point;
