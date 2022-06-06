import { css } from "styled-components";

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
