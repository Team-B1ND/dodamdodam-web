import styled from "styled-components";
import { palette } from "../../../style/palette";

export const NoticeContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;

export const NoticeLabel = styled.div`
  width: 70px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  user-select: none;
  background-color: ${palette.blue[300]};
  font-size: 14px;
`;

export const NoticeChangeButton = styled.button`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  color: ${({ theme }) => theme.contrast2};
  border: 0px;
  cursor: pointer;
`;

export const NoticeIndex = styled.span`
  color: ${({ theme }) => theme.contrast2};
  font-size: 14px;
`;

export const NoticeTitle = styled.p`
  color: ${({ theme }) => theme.contrast2};
  font-size: 14px;
`;
