import styled, { css } from "styled-components";

export const ApplyLeaveFormContainer = styled.div<{ isFold: boolean }>`
  width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease 0s;
  position: relative;
  color: ${({ theme }) => theme.contrast};
  ${({ isFold }) =>
    isFold
      ? css`
          left: 84px;
        `
      : css`
          left: 144px;
        `};
`;
