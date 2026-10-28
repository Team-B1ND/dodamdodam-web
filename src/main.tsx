import { createRoot } from "react-dom/client";
import "./index.css";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import {
  OverlayProvider,
  ToastProvider,
} from "@b1nd/dodam-design-system/components";
import ErrorBoundary from "@/shared/ui/error-boundary";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { history } from "@/shared/libs/history";
import { queryClient } from "@/shared/libs/query-client";

const router = createRouter({ routeTree, history });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastProvider />
    <OverlayProvider>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </OverlayProvider>
  </QueryClientProvider>,
);
