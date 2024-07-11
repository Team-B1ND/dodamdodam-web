import styled from "styled-components";
import { ellipsisLine } from "@src/style/libStyle";
import { Flex } from "@src/style/flex";

export const TodayWakeupSongItemContainer = styled.div`
  width: 100%;
  height: 50%;

  margin: 5px 0 2px;
  border-bottom: 1px solid hsla(0, 0%, 88.6%, 0.8);

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const TodayWakeupSongItemBackgroundWrap = styled.div`
  position: relative;
  width: 207px;
  height: 105px;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
`;

export const TodayWakeupSongItemBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TodayWakeupSongItemTextWrap = styled.div`
  width: 207px;
  height: 105px;

  position: absolute;
  top: 0px;
  left: 0px;

  background-color: rgba(61, 61, 61, 0.4);
  transition: background-color 0.3s ease;
  padding: 0px 10px;

  ${Flex({ $alignItems: "center" })}

  &:hover {
    background-color: rgba(26, 26, 26, 0.5);
  }
`;

export const TodayWakeupSongItemText = styled.p`
  color: white;
  font-size: 12px;
  ${ellipsisLine(2)}
  line-height: 16px;
`;
