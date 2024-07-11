import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const MyInfoItemVoidContainer = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const MyInfoItemVoidTextWrap = styled.div`
  ${Flex({ $flexDirection: "column", $rowGap: "5px" })}
`;

export const MyInfoItemVoidTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  text-align: center;
  line-height: 21px;
`;

export const MyInfoItemVoidSubTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast2};
  text-align: center;
  line-height: 18px;
`;
