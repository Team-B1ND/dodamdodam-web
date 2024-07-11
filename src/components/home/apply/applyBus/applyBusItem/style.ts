import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";
import { Flex } from "@src/style/flex";

export const ApplyBusItemContainer = styled.div`
  width: 348px;
  min-height: 32px;

  border: 1px solid ${({ theme }) => theme.borderColor};
  padding-left: 8px;

  cursor: pointer;
  margin-bottom: 16px;

  ${Flex({ $alignItems: "center" })}
`;

export const ApplyBusItemText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyBusItemLimit = styled.span<{ isLimit: boolean }>`
  ${({ isLimit, theme }) =>
    isLimit
      ? css`
          color: ${palette.red[300]};
        `
      : css`
          color: ${theme.contrast};
        `}
`;

export const ApplyBusItemCheckIcon = styled.div<{ check: boolean }>`
  width: 30px;
  height: 30px;

  font-size: 30px;
  margin-left: auto;
  margin-right: 18px;
  color: ${({ theme }) => theme.borderColor};

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}

  ${({ check }) =>
    check &&
    css`
      color: ${palette.main};
    `};
`;

export const ApplyBusItemDeleteButton = styled.button`
  width: 20px;
  height: 100%;

  background-color: ${({ theme }) => theme.desableBackground};
  border: 0px;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;
  outline: none;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const ApplyBusItemDeleteIcon = styled.div`
  width: 14px;
  height: 14px;

  font-size: 14px;
  color: ${({ theme }) => theme.contrast};

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
  ${ApplyBusItemDeleteButton}:hover & {
    color: ${palette.red["400"]};
  }
`;
