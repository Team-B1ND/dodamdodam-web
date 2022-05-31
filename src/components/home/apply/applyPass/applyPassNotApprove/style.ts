import styled, { css } from "styled-components";
import { palette } from "../../../../../style/palette";

export const ApplyPassNotApproveFoldButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 5px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-left: 0px;
  border-radius: 0 5px 5px 0;
  background-color: ${({ theme }) => theme.backgroundColor3};
  margin-top: 12px;
  cursor: pointer;
  outline: none;
`;

export const ApplyPassNotApproveContainer = styled.div<{ fold: boolean }>`
  top: 0px;
  position: absolute;
  display: flex;
  transition: left 0.3s ease 0s;

  ${({ fold }) =>
    fold
      ? css`
          left: -124px;

          ${ApplyPassNotApproveFoldButton}:hover & {
            left: -116px;
          }
        `
      : css`
          left: 1px;
        `}
`;

export const ApplyPassNotApproveWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 124px;
  height: 265px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
`;

export const ApplyPassNotApproveFoldIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.main};
  font-size: 17px;
`;

export const ApplyPassNotApproveVoidWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ApplyPassNotApproveVoidIcon = styled.div`
  width: 42px;
  height: 42px;
  font-size: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.borderColor};
`;
