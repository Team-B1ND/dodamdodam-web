import usePoint from "hooks/point/usePoint";
import styled from "styled-components";

export const SchoolPointWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 233.77px;
  height: 34.55px;
  padding: 10px 0 0 11px;
`;

export const SchoolMeritPointGraph = styled.div<{ point: number }>`
  display: flex;
  height: 13.81px;
  max-width: 233.766px;
  width: ${({ point }) => (point === 0 ? 1 : point * 4)}%;
  background-color: #0067bc;
`;

export const SchoolDemeritPointGraph = styled.div<{ point: number }>`
  display: flex;
  height: 13.81px;
  max-width: 233.766px;
  width: ${({ point }) => (point === 0 ? 1 : point * 4)}%;
  background-color: #f97e6d;
`;

export const DormitoryPointWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 233.77px;
  height: 34.55px;
  padding: 10px 0 0 11px;
`;

export const DormitoryMeritPointGraph = styled.div<{ point: number }>`
  display: flex;
  height: 13.81px;
  max-width: 233.766px;
  width: ${({ point }) => (point === 0 ? 1 : point * 4)}%;
  background-color: #0067bc;
`;

export const DormitoryDemeritPointGraph = styled.div<{ point: number }>`
  display: flex;
  height: 13.81px;
  max-width: 233.766px;
  width: ${({ point }) => (point === 0 ? 1 : point * 4)}%;
  background-color: #f97e6d;
`;

export const PointContainer = styled.div`
  width: 384px;
  height: 146px;
  color: ${({ theme }) => theme.contrast};
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
`;
