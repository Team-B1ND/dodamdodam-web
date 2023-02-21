import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.contrast};
`;
