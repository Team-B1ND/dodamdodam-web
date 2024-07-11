import styled from "styled-components";
import { palette } from "@src/style/palette";
import { AuthPartFade } from "../style";
import { Flex } from "@src/style/flex";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const LoginWrap = styled.form`
  width: 350px;
  ${Flex({ $flexDirection: "column" })}
  animation: ${AuthPartFade} 1s;
`;

export const LoginInputForm = styled.div`
  width: 100%;
  ${Flex({ $flexDirection: "column", $rowGap: "28px" })}
`;

export const LoginKeepWrap = styled.div`
  width: 100%;
  height: 30px;

  margin-top: 35px;
  margin-bottom: 49px;

  ${Flex({
    $alignItems: "center",
    $justifyContent: "start",
    $columnGap: "8px",
  })}
`;

export const LoginKeepCheckBox = styled.div<{ isCheck: boolean }>`
  width: 22px;
  height: 22px;

  border-radius: 100%;
  border: 0.1rem solid ${({ isCheck }) => (isCheck ? palette.main : "#cccccc")};
  cursor: pointer;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const LoginKeepCheckBoxIcon = styled.div`
  width: 18px;
  height: 18px;

  color: ${palette.main};
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const LoginKeepText = styled.p`
  font-size: 14px;
`;

export const LoginSubmitButton = styled.button`
  background-color: #0067bcd9;
  height: 45px;
  border: 0px;

  font-size: 16px;
  color: white;
  border-radius: 5px;
  margin-bottom: 33px;
  cursor: pointer;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;
