import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import ThemeProviderContainer from "./components/common/ThemeProviderContainer";
import { B1ndToastContainer } from "@b1nd/b1nd-toastify";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

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
