import styled from "styled-components";
import { ellipsisLine } from "../../../../style/libStyle";

export const TodayWakeupSongItemContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 2px;
  border-bottom: 1px solid hsla(0, 0%, 88.6%, 0.8);
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
  display: flex;
  align-items: center;

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
