import styled, { css } from "styled-components";
import { customScrollBar } from "../../../../../style/libStyle";
import { palette } from "../../../../../style/palette";

export const ApplyLeaveFormContainer = styled.div<{ isFold: boolean }>`
  width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease 0s;
  position: relative;
  color: ${({ theme }) => theme.contrast};
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ApplyLeaveFormColumnTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  margin-right: 10px;
  line-height: 21px;
`;

export const ApplyLeaveFormDatePickerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.contrast};
  margin-left: 5px;
`;

export const ApplyLeaveFormTimeInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  text-align: center;
  font-size: 12px;
  background-color: ${({ theme }) => theme.backgroundColor3};
`;

export const ApplyLeaveFormNoticeText = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${palette.red[300]};
`;

export const ApplyLeaveFormTextAreaWrap = styled.div`
  width: 310px;
  height: 65px;
  margin-top: 3px;
  position: relative;
`;

export const ApplyLeaveFormTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  resize: none;
  padding: 5px;
  outline: none;
  background-color: ${({ theme }) => theme.backgroundColor3};

  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.contrast2};
  }

  ${customScrollBar}
`;

export const ApplyPassFormTextAreaLength = styled.span<{ isExcess: boolean }>`
  position: absolute;
  font-size: 12px;
  color: ${({ theme }) => theme.contrast};
  bottom: 5px;
  right: 10px;

  ${({ isExcess }) => isExcess && `color : ${palette.red[300]}`};
`;
