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

export const TodayScheduleItemWrap = styled.div`
  width: 246px;
  height: 100%;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const TodayScheduleVoidText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  margin: auto 0px; ;
`;
