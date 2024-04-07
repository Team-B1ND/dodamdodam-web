import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";

export const ApplyContainer = styled.div`
  width: 505px;
  height: 320px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
`;

export const ApplyTitleWrap = styled.div`
  width: 100%;
  min-height: 56px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const ApplyTitleIcon = styled.img`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  object-fit: scale-down;
`;

export const ApplyTitleText = styled.h1`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
`;

export const ApplyTitleItemWrap = styled.div`
  width: 230px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const ApplyTitleItem = styled.div<{ isSelect: Boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: ${palette.gray[200]};
    transition: border-bottom 0.1s ease-out;

    ${({ isSelect }) =>
      isSelect &&
      css`
        color: ${palette.main};
        border-bottom: 3px solid ${palette.main};
      `};
  }
`;

export const ApplyFormWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  position: relative;
  overflow: hidden;
`;

export const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.contrast};
`;
