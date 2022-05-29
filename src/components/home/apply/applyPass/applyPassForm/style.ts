import styled from "styled-components";
import { palette } from "../../../../../style/palette";

export const ApplyPassFormContainer = styled.div<{ isFold: boolean }>`
  width: 302px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto;
  margin-top: 10px;
  transition: left 0.3s ease 0s;

  ${({ isFold }) => !isFold && "margin-left : 160px"};
`;

export const ApplyPassFormColumnWrap = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ApplyPassFormInputWrap = styled.div`
  width: 222px;
  display: flex;
  align-items: center;
`;

export const ApplyPassFormColumnTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  margin-right: 10px;
  line-height: 21px;
`;

export const ApplyPassFormDatePickerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ApplyPassFormDatePickerIcon = styled.label`
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

export const ApplyPassFormTimeInputWrap = styled.div`
  width: 105px;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyPassFormTimeInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  text-align: center;
  font-size: 12px;
`;

export const ApplyPassFormTimeInputTilde = styled.span`
  margin: 0px 5px;
`;

export const ApplyPassFormNoticeText = styled.p`
  font-size: 12px;
  color: ${palette.red[500]};
`;
