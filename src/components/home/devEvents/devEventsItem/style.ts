import { ellipsisLine } from "@src/style/libStyle";
import styled from "styled-components";
import { palette } from "@src/style/palette";

export const DevEventsItemContainer = styled.div`
  width: 227.2px;
  min-height: 270px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const DevEventsItemImgWrap = styled.div`
  width: 100%;
  min-height: 138px;
  position: relative;
`;

export const DevEventsItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DevEventsItemDate = styled.div`
  height: 24px;
  padding: 0px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
  color: white;
  position: absolute;
  right: 9px;
  bottom: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

export const DevEventsItemContentWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const DevEventsItemTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  word-break: break-all;
  line-height: 24px;
  max-height: 48px;
  font-weight: bold;
  ${ellipsisLine(2)};
`;

export const DevEventsItemOrganization = styled.p`
  color: ${palette.gray[300]};
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: auto;
`;

export const DevEventsItemLabel = styled.div<{ borderColor: string }>`
  width: min-content;
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 11px;
  margin-top: 5px;
  padding: 6px;
  border: 1px solid ${({ borderColor }) => borderColor};
  color: ${({ borderColor }) => borderColor};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.backgroundColor3};
  white-space: nowrap;
`;

export const DevEventsTagWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  row-gap: 2px;
  column-gap: 5px;
`;

export const DevEventsTagItem = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${palette.gray[400]};
`;
