import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const TodayScheduleListContainer = styled.div`
  width: 246px;
  height: 100%;
  padding: 10px 0px;
  ${Flex({ $flexDirection: "column", $rowGap: "10px" })}
`;

export const TodayScheduleListVoidText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  margin: auto 0px;
`;
