import styled from "styled-components";
import { skeletonAnimtaion } from "@b1nd/b1nd-styled-components-util";

const DevEventListFallbackLoader = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <Item key={idx} />
      ))}
    </>
  );
};

const Item = styled.div`
  width: 227.2px;
  height: 270px;
  ${skeletonAnimtaion};
`;

export default DevEventListFallbackLoader;
