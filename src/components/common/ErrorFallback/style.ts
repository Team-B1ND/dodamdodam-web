import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  ${Flex({
    $flexDirection: "column",
    $alignItems: "center",
    $justifyContent: "center",
    $rowGap: "10px",
  })}
`;

export const ErrorComment = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
`;

export const RefetchButton = styled.button`
  width: 80px;
  height: 26px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor4};
  font-size: 12px;

  cursor: pointer;
  color: ${({ theme }) => theme.contrast};

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;
