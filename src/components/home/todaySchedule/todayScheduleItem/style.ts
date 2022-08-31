import styled from "styled-components";

export const TodayScheduleItemContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TodayScheduleItemTitle = styled.h1`
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
  color: ${({ theme }) => theme.contrast};
`;

export const TodayScheduleItemTargetWrap = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const TodayScheduleItemTargetCategory = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.contrast};
  margin-right: 5px;
`;

export const TodayScheduleItemTargetText = styled.span`
  color: ${({ theme }) => theme.contrast};
`;
