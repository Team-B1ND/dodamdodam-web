import styled from "styled-components";

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
  margin-bottom: 33px;
  row-gap: 28px;
`;

export const LoginInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const LoginInputTitle = styled.h1`
  font-size: 14px;
  color: #a1a1a1;
`;

export const LoginInput = styled.input`
  width: 100%;
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

export const LoginKeepCheckBox = styled.input`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  border: 0.1rem solid #ccc;
  cursor: pointer;
`;

export const LoginKeepText = styled.p`
  font-size: 14px;
  border: 1px solid #ccc;
`;
