import styled from "styled-components";

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

export const MyInfoHeaderLogoutButton = styled.button`
  min-width: 62px;
  height: 26px;
  background-color: ${({ theme }) => theme.backgroundColor3};
  font-size: 12px;
  color: ${({ theme }) => theme.contrast};
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-top: 34px;
  cursor: pointer;
`;
