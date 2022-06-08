import { createGlobalStyle } from "styled-components";

const MaterialStyle = createGlobalStyle`
  

  .MuiInputBase-root {
    color: ${({ theme }) => theme.contrast} !important;
    font-size: inherit !important;
    font-weight: inherit !important;
  }

  .MuiInput-underline:before{
    border-bottom :  1px solid ${({ theme }) => theme.contrast} !important;
  }

  .MuiOutlinedInput-input{
    padding : 0px !important;
    border: 0px !important;
  }

  .PrivateNotchedOutline-root-1 {
    border: 0px !important;
  }

`;

export default MaterialStyle;
