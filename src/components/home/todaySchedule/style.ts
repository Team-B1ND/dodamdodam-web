import styled from "styled-components";

export const TodayScheduleContainer = styled.div`
  width: 280px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
`;
