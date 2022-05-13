import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./font.css";

const GlobalStyle = createGlobalStyle`
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'NotoSansKR-Regular';
    }

    ${reset}
`;

export default GlobalStyle;
