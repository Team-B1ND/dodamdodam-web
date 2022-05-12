import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import PageTemplate from "./components/common/pageTemplate/pageTemplate";
import ThemeProviderContainer from "./components/common/themeProviderContainer/themeProviderContainer";

function Root() {
  return (
    <StrictMode>
      <RecoilRoot>
        <ThemeProviderContainer>
          <PageTemplate>
            <App />
          </PageTemplate>
        </ThemeProviderContainer>
      </RecoilRoot>
    </StrictMode>
  );
}

export default Root;
