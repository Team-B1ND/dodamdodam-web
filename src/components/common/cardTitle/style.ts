import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const CardTitleContainer = styled.div`
  width: calc(100% - 32px);
  min-height: 56px;
  margin: 0px auto;

  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  ${Flex({ $alignItems: "center" })}
`;

export const CardTitleIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  object-fit: scale-down;

  svg {
    width: 18px;
    height: 18px;
  }

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const CardTitleText = styled.h1`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
`;

export const CardTitleRedirectWrap = styled.span`
  color: ${({ theme }) => theme.contrast};
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;
  ${Flex({ $alignItems: "center" })}
`;

export const CardTitleRedirectIcon = styled.div`
  width: 18px;
  height: 18px;
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;
