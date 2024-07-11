import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";
import { Flex } from "@src/style/flex";

export const ApplyContainer = styled.div`
  width: 505px;
  height: 320px;

  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};

  ${Flex({ $flexDirection: "column" })}
`;

export const ApplyTitleWrap = styled.div`
  width: 100%;
  min-height: 56px;
  padding-left: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  ${Flex({ $alignItems: "center" })}
`;

export const ApplyTitleIcon = styled.img`
  width: 18px;
  height: 18px;

  margin-right: 12px;
  object-fit: scale-down;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
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
  margin-left: auto;
  ${Flex({ $alignItems: "center" })}
`;

export const ApplyTitleItem = styled.div<{ isSelect: Boolean }>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  ${Flex({ $justifyContent: "center", $alignItems: "center" })}

  span {
    width: 50px;
    height: 100%;

    ${Flex({ $alignItems: "center", $justifyContent: "center" })}

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
