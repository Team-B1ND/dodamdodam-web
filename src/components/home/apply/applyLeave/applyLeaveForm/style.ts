import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";
import { Flex } from "@src/style/flex";

export const ApplyLeaveFormContainer = styled.div<{ isFold: boolean }>`
  width: 340px;
  height: 100%;

  transition: left 0.3s ease 0s;
  position: relative;
  color: ${({ theme }) => theme.contrast};

  ${Flex({
    $flexDirection: "column",
    $alignItems: "center",
    $justifyContent: "center",
  })}

  ${({ isFold }) =>
    isFold
      ? css`
          left: 84px;
        `
      : css`
          left: 144px;
        `};
`;

export const ApplyLeaveFormColumnWrap = styled.div`
  height: 32px;
  ${Flex({ $alignItems: "center", $justifyContent: "space-between" })}
`;

export const ApplyLeaveFormColumnTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  margin-right: 10px;
  line-height: 21px;
`;

export const ApplyLeaveFormInputWrap = styled.div`
  width: 222px;
  ${Flex({ $alignItems: "center" })}
`;

export const ApplyLeaveFormDatePickerWrap = styled.div`
  position: relative;
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const ApplyLeaveFormDatePickerIcon = styled.label`
  font-size: 24px;
  color: ${({ theme }) => theme.contrast};
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  right: 0px;
  padding: 12px;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ApplyLeaveFormTimeInputWrap = styled.div`
  width: 105px;
  height: 32px;

  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.contrast};
  margin-left: 5px;

  ${Flex({ $alignItems: "center" })}
`;

export const ApplyLeaveFormTimeInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  text-align: center;
  font-size: 12px;
  background-color: ${({ theme }) => theme.backgroundColor3};
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyLeaveFormNoticeText = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${palette.red[300]};
`;
