import styled, { css } from "styled-components";
import { palette } from "../../../style/palette";

export const MyInfoContainer = styled.div`
  width: 384px;
  height: 446px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundColor3};
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

export const MyInfoHeaderWrap = styled.div`
  width: 100%;
  min-height: 111px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor2};
`;

export const MyInfoHeaderProfileImg = styled.img`
  width: 62px;
  height: 62px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 23px;
`;

export const MyInfoHeaderInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const MyInfoHeaderNameWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  font-weight: bold;
  line-height: 21px;
`;

export const MyInfoHeaderRedirectText = styled.p`
  margin-left: 12px;
  font-size: 12px;
  text-decoration: underline;
  font-weight: 300;
  cursor: pointer;
`;

export const MyInfoHeaderClassWrap = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  line-height: 18px;
`;

export const MyInfoLogoutButton = styled.button`
  min-width: 62px;
  height: 26px;
  background-color: ${({ theme }) => theme.backgroundColor3};
  font-size: 12px;
  color: ${({ theme }) => theme.contrast};
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-top: 34px;
  cursor: pointer;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.desableBackground};

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  &:nth-child(2) {
    border: 1px solid ${({ theme }) => theme.borderColor};
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
`;
