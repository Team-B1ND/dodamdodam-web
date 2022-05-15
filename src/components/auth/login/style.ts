import styled from "styled-components";
import { palette } from "../../../style/palette";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginWrap = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

export const LoginInputForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

export const LoginInputWrap = styled.div`
  height: 56px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const LoginInputTitle = styled.h1`
  font-size: 14px;
  color: #a1a1a1;
  line-height: 18px;
`;

export const LoginInput = styled.input`
  width: calc(100% - 16px);
  height: 100%;
  margin: 0px 8px;
  padding: 2px 5px;
  padding-top: 0px;
  border: 0px;
  outline: none;
  border-bottom: 1px solid #a1a1a1;
  font-size: 18px;
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
`;

export const LgoinSignupWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 7px;
  margin-top: 33px;
`;

export const LoginSignupText = styled.p`
  color: #cccccc;
  font-size: 14px;
`;

export const LoginSignupButton = styled.button`
  font-size: 14px;
  color: ${palette.main};
  background: none;
  border: 0px;
`;
