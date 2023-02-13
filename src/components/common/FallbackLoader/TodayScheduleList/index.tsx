import styled from "styled-components";
import { skeletonAnimtaion } from "@b1nd/b1nd-styled-components-util";

const TodayScheduleListFallbackLoader = () => {
  return (
    <Container>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Item key={idx} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 246px;
  height: 100%;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Item = styled.div`
  width: 100%;
  height: 40px;
  ${skeletonAnimtaion}
`;

export default TodayScheduleListFallbackLoader;
