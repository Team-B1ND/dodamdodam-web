import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";
import { Flex } from "@src/style/flex";

export const ApplyNotApproveListFoldButton = styled.button`
  width: 28px;
  height: 28px;

  padding: 5px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-left: 0px;
  border-radius: 0 5px 5px 0;
  background-color: ${({ theme }) => theme.backgroundColor3};
  margin-top: 12px;
  cursor: pointer;
  outline: none;
`;

export const ApplyNotApproveListContainer = styled.div<{ fold: boolean }>`
  top: 0px;
  position: absolute;
  display: flex;
  transition: left 0.3s ease 0s;

  ${({ fold }) =>
    fold
      ? css`
          left: -124px;

          ${ApplyNotApproveListFoldButton}:hover & {
            left: -116px;
          }
        `
      : css`
          left: 1px;
        `}
`;

export const ApplyNotApproveListWrap = styled.div`
  width: 124px;
  height: 265px;

  border-right: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  ${Flex({ $flexDirection: "column" })}
`;

export const ApplyNotApproveListFoldIcon = styled.div`
  width: 100%;
  height: 100%;
  color: ${palette.main};
  font-size: 17px;
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const ApplyNotApproveListVoidWrap = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const ApplyNotApproveListVoidIcon = styled.div`
  width: 42px;
  height: 42px;
  font-size: 42px;
  color: ${({ theme }) => theme.borderColor};
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;
