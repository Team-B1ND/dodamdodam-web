import styled from "styled-components";

export const TodayWakeupSongContainer = styled.div`
  width: 280px;
  height: 326px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
