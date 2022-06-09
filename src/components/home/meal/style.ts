import styled from "styled-components";

export const MealContainer = styled.div`
  width: 505px;
  height: 326px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MealItemWrap = styled.div`
  width: 460px;
  height: 231px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
