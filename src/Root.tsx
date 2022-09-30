import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import ThemeProviderContainer from "./components/common/themeProviderContainer/themeProviderContainer";

const queryClient = new QueryClient();

function Root() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProviderContainer>
            <ToastContainer autoClose={5000} limit={9} />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProviderContainer>
        </RecoilRoot>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default Root;
