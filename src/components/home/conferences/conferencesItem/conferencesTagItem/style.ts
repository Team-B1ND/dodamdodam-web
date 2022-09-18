import styled from "styled-components";

export const ConferencesTagItemContainer = styled.div<{
  backgroundColor: string;
}>`
  padding: 10px;
  height: 24px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 20px;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
