import styled from "styled-components";

export const ConferencesItemContainer = styled.div`
  width: 227.2px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ConferencesItemImg = styled.img`
  width: 100%;
  height: 138px;
  object-fit: cover;
`;
