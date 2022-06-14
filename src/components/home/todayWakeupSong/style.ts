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

export const TodayWakeupSongItemWrap = styled.div`
  width: 246px;
  height: 100%;
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TodayWakeupSongVoidText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  margin: auto 0px;
`;
