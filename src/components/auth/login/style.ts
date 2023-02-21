import styled from "styled-components";
import { palette } from "@src/style/palette";
import { AuthPartFade } from "../style";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginWrap = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  animation: ${AuthPartFade} 1s;
`;

export const LoginInputForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

export const LoginKeepWrap = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 35px;
  margin-bottom: 49px;
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: 8px;
`;

export const LoginKeepCheckBox = styled.div<{ isCheck: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  border: 0.1rem solid ${({ isCheck }) => (isCheck ? palette.main : "#cccccc")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginKeepCheckBoxIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.main};
`;

export const LoginKeepText = styled.p`
  font-size: 14px;
`;

export const LoginSubmitButton = styled.button`
  background-color: #0067bcd9;
  height: 45px;
  border: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  border-radius: 5px;
  margin-bottom: 33px;
  cursor: pointer;
`;
