import styled, { css } from "styled-components";

export const PointContainer = styled.div`
  width: 384px;
  height: 146px;
  color: ${({ theme }) => theme.contrast};
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  display: flex;
  flex-direction: column;
`;

export const PointWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const PointLeftWrap = styled.div`
  width: 287px;
`;

export const PointRightWrap = styled.div`
  width: 95px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PointGraphWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 233.77px;
  height: 34.55px;
  padding: 10px 0 0 11px;
`;

export const PointGraph = styled.div<{ point: number; isMerit: boolean }>`
  display: flex;
  height: 13.81px;
  max-width: 233.766px;
  width: ${({ point }) => (point === 0 ? 1 : point * 4)}%;
  background-color: #0067bc;

  ${({ isMerit }) =>
    isMerit
      ? css`
          background-color: #0067bc;
        `
      : css`
          background-color: #f97e6d;
        `}
`;
