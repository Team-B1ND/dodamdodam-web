import { ellipsisLine } from "../../../../style/libStyle";
import styled from "styled-components";

export const ConferencesItemContainer = styled.div`
  width: 227.2px;
  min-height: 270px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ConferencesItemImgWrap = styled.div`
  width: 100%;
  height: 138px;
  position: relative;
`;

export const ConferencesItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ConferencesItemDate = styled.div`
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

export const ConferencesItemContentWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const ConferencesItemTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  word-break: break-all;
  line-height: 24px;
  max-height: 48px;
  font-weight: bold;
  ${ellipsisLine(2)};
`;

export const ConferencesTagWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  row-gap: 5px;
  column-gap: 5px;
`;
