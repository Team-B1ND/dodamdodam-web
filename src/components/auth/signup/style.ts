import styled, { css } from "styled-components";
import { AuthPartFade } from "../style";
import { Flex } from "@src/style/flex";

export const SignupContainer = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const SignupWrap = styled.div`
  width: 400px;
  animation: ${AuthPartFade} 1s;
  ${Flex({ $alignItems: "center", $flexDirection: "column" })}
`;

export const SignupInputForm = styled.div`
  width: 350px;
  height: 100%;
  margin-bottom: 8px;

  ${Flex({
    $flexDirection: "column",
    $justifyContent: "center",
    $rowGap: "24px",
  })}
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

  border-radius: 5px;
  font-size: 16px;
  column-gap: 10px;
  cursor: pointer;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}

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
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;
