import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const Container = styled.div`
  padding-top: 60px;
`;

export const Column = styled.div`
  ${Flex({ $flexDirection: "column", $rowGap: "16px" })}
`;

export const Row = styled.div`
  ${Flex({ $columnGap: "16px" })}
`;
