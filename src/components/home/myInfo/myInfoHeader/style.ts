import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const MyInfoHeaderWrap = styled.div`
  width: 100%;
  min-height: 111px;

  padding: 0px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor2};

  ${Flex({ $alignItems: "center" })}
`;

export const MyInfoHeaderProfileImg = styled.img`
  min-width: 62px;
  max-width: 62px;
  min-height: 62px;
  max-height: 62px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 23px;
  cursor: pointer;
`;

export const MyInfoHeaderInfoWrap = styled.div`
  width: 100%;
  ${Flex({ $flexDirection: "column", $rowGap: "5px" })}
`;

export const MyInfoHeaderNameWrap = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  font-weight: bold;
  line-height: 21px;
  ${Flex({ $alignItems: "center" })}
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
