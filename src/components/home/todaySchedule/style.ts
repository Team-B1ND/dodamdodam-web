import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const TodayScheduleContainer = styled.div`
  width: 280px;
  height: 320px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  ${Flex({ $flexDirection: "column", $alignItems: "center" })}
`;
