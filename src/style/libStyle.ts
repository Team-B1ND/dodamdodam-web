import { css, FlattenSimpleInterpolation } from "styled-components";

export const customScrollBar = css`
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #0067bcb3;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.hoverColor};
    border-radius: 2px;
  }
`;

export const ellipsisLine = (
  lineClamp: number
): FlattenSimpleInterpolation => css`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -ms-word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lineClamp};
`;
