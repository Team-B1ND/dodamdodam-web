import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const PageTemplateContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  padding-top: 100px;
  background-color: ${({ theme }) => theme.backgroundColor};

  ${Flex({ $flexDirection: "column", $alignItems: "center" })}
`;

export const PageTemplateWrap = styled.div`
  min-width: 1200px;
  max-width: 1200px;
  height: 100%;

  ${Flex({ $flexDirection: "column" })}
`;
