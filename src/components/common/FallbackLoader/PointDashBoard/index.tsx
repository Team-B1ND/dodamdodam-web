import styled from "styled-components";
import { skeletonAnimtaion } from "@b1nd/b1nd-styled-components-util";
import { Flex } from "@src/style/flex";

const PointDashBoardFallbackLoader = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, idx) => (
        <GraphItem key={idx} />
      ))}
    </>
  );
};

const GraphItem = () => (
  <GraphWrap>
    <GraphPointText />
    <Graph />
  </GraphWrap>
);

const GraphWrap = styled.div`
  width: 100%;
  height: 34px;
  ${Flex({ $alignItems: "center" })}
`;

const GraphPointText = styled.div`
  min-width: 32px;
  height: 13.81px;
  margin-right: 20px;
  ${skeletonAnimtaion}
`;

const Graph = styled.div`
  width: 100%;
  height: 13.81px;
  ${skeletonAnimtaion}
`;

export default PointDashBoardFallbackLoader;
