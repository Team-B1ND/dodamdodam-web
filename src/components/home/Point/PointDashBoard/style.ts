import styled, { css } from "styled-components";

export const PointDashBoardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 34px;
`;

export const PointDashBoardGraphText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  min-width: 32px;
  display: flex;
  justify-content: start;
  white-space: nowrap;
`;

export const PointDashBoardGraph = styled.div<{
  point: number;
  isBonusPoint: boolean;
}>`
  display: flex;
  height: 13.81px;
  max-width: 100%;
  width: ${({ point }) =>
    point === 0 ? 1 : point * 4 >= 100 ? 100 : point * 4}%;
  background-color: #0067bc;

  ${({ isBonusPoint }) =>
    isBonusPoint
      ? css`
          background-color: #0067bc;
        `
      : css`
          background-color: #f97e6d;
        `}
`;
