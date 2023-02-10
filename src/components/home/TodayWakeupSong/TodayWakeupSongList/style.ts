import styled from "styled-components";

export const TodayWakeupSongListContainer = styled.div`
  width: 246px;
  height: 100%;
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TodayWakeupSongListVoidText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  margin: auto 0px;
`;
