import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import ThemeProviderContainer from "./components/common/themeProviderContainer/themeProviderContainer";

function Root() {
  return (
    <StrictMode>
      <RecoilRoot>
        <ThemeProviderContainer>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProviderContainer>
      </RecoilRoot>
    </StrictMode>
  );
}

export default Root;
