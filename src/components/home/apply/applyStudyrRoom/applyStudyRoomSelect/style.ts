import styled from "styled-components";
import { palette } from "../../../../../style/palette";

export const ApplyStudyRoomSelectWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
`;

export const ApplyStudyRoomSelectTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ApplyStudyRoomSelectTitle = styled.h1`
  font-size: 16px;
  line-height: 21px;
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyStudyRoomSelectTime = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.contrast};
  margin-left: 5px;
`;

export const ApplyStudyRoomSelectInput = styled.select`
  width: 165px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  padding-left: 13px;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.contrast};

  :focus {
    border: 1px solid ${palette.main};
  }
`;
