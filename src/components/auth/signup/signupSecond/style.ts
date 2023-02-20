import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";

export const SignupAgreeWrap = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
  margin-bottom: 24px;
`;

export const SignupAgreeInputWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const SignupAgreeCheckBox = styled.div<{ isCheck: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  border: 0.1rem solid ${({ isCheck }) => (isCheck ? palette.main : "#cccccc")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignupAgreeInputIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.main};
`;

export const SignupAgreeInputText = styled.h1<{ isCheck: boolean }>`
  color: #ccc;
  font-size: 14px;

  ${({ isCheck }) =>
    isCheck &&
    css`
      color: ${palette.main};
    `}
`;

export const SignupAgreeDetail = styled.p`
  font-size: 14px;
  color: #7c7c7c;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
