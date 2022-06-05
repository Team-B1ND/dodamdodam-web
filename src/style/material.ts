import { createGlobalStyle } from "styled-components";

const MaterialStyle = createGlobalStyle`
  

  .MuiInputBase-root {
    color: ${({ theme }) => theme.contrast} !important;
  }

  .MuiInput-underline:before{
    border-bottom :  1px solid ${({ theme }) => theme.contrast} !important;
  }

`;

export default MaterialStyle;
