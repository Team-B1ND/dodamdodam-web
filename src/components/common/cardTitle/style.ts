import styled from "styled-components";

export const CardTitleContainer = styled.div`
  width: calc(100% - 32px);
  height: 56px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const CardTitleIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const CardTitleText = styled.h1`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  cursor: pointer;
  font-weight: bold;
`;

export const CardTitleRedirectWrap = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.contrast};
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;
`;

export const CardTitleRedirectIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
