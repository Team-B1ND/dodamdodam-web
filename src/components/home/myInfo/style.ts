import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";
import { Flex } from "@src/style/flex";

export const MyInfoContainer = styled.div`
  width: 384px;
  height: 446px;

  background-color: ${({ theme }) => theme.backgroundColor3};
  border: 1px solid ${({ theme }) => theme.borderColor};
  position: relative;

  ${Flex({ $flexDirection: "column" })}
`;

export const MyInfoTopIcon = styled.img`
  object-fit: scale-down;
  height: 55px;
  top: -55px;
  left: 0px;
  position: absolute;
`;

export const MyInfoItemsWrap = styled.div`
  width: 100%;
  min-height: 38px;
  display: flex;
`;

export const MyInfoItem = styled.div<{ isSelect: boolean }>`
  width: 100%;
  height: 100%;

  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  border-top: 0px;

  background-color: ${({ theme }) => theme.desableBackground};

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  &:nth-child(2) {
    border-left: 1px solid ${({ theme }) => theme.borderColor};
    border-top: 0px;

    ${({ isSelect }) =>
      isSelect &&
      css`
        border-bottom: 0px;
      `}
  }

  ${({ isSelect }) =>
    isSelect
      ? css`
          color: ${palette.main};
          font-weight: bold;
          border-bottom: 0px;
          background-color: ${({ theme }) => theme.backgroundColor3};
        `
      : css`
          border-bottom: 1px solid ${({ theme }) => theme.borderColor};
        `}
`;

export const MyInfoListWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;
