import styled from "styled-components";
import { customScrollBar } from "@src/style/libStyle";
import { Flex } from "@src/style/flex";

export const ApplyBusContainer = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $flexDirection: "column", $alignItems: "center" })}
`;

export const ApplyBusDate = styled.span`
  margin: 16px 0px;
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyBusItemContainer = styled.div`
  width: 100%;
  height: 191px;
  padding: 0px 3px;
`;

export const ApplyBusItemWrap = styled.div`
  width: 100%;
  height: 191px;

  overflow-y: scroll;

  ${Flex({ $flexDirection: "column", $alignItems: "center" })}
  ${customScrollBar}
`;
