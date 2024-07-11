import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";
import { Flex } from "@src/style/flex";

export const SignupAgreeWrap = styled.div`
  width: 90%;
  height: 30px;

  margin: 0px auto;
  margin-bottom: 24px;

  ${Flex({ $alignItems: "center", $justifyContent: "space-between" })}
`;

export const SignupAgreeInputWrap = styled.div`
  ${Flex({ $alignItems: "center", $columnGap: "8px" })}
`;

export const SignupAgreeCheckBox = styled.div<{ isCheck: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  border: 0.1rem solid ${({ isCheck }) => (isCheck ? palette.main : "#cccccc")};
  cursor: pointer;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const SignupAgreeInputIcon = styled.div`
  width: 18px;
  height: 18px;
  color: ${palette.main};
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
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
