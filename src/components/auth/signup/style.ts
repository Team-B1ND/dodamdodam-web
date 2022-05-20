import styled, { css } from "styled-components";
import { AuthPartFade } from "../style";

export const SignupContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignupWrap = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${AuthPartFade} 1s;
`;

export const SignupInputForm = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 24px;
  margin-bottom: 8px;
`;

export const SignupPartButtonWrap = styled.div`
  width: 100%;
  min-height: 45px;
  display: flex;
  margin-top: auto;
  margin-bottom: 20px;
`;

export const SignupPartButton = styled.div<{ direction: "prev" | "next" }>`
  width: 125px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 16px;
  column-gap: 10px;
  cursor: pointer;

  ${({ direction }) =>
    direction === "prev"
      ? css`
          background-color: white;
          border: 1px solid #0067bcd9;
          color: #0067bcd9;
        `
      : css`
          background-color: #0067bcd9;
          color: white;
          margin-left: auto;
        `}
`;

export const SignupPartButtonIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
