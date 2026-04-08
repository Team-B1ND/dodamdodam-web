import {
  Outlet,
  createRootRoute,
  type ErrorComponentProps,
  useRouterState,
} from "@tanstack/react-router";
import Sidebar from "@/widgets/sidebar/ui";
import { MENUS } from "@/widgets/sidebar/constants/sidebar-item";
import { useGetMeQuery } from "@/entities/user/queries";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "@/shared/ui/error-fallback";
import NotFound from "@/shared/ui/not-found";
import type { SidebarMenuType } from "@/widgets/sidebar/types/sidebar-item/sidebar-item";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: NotFound,
});

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  const { reset: resetQueryError } = useQueryErrorResetBoundary();

  const handleRetry = () => {
    resetQueryError();
    reset();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background-default px-8 py-7">
      <div className="w-full max-w-120">
        <ErrorFallback error={error} onRetry={handleRetry} />
      </div>
    </div>
  );
}

function RootComponent() {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 640px)").matches,
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { location } = useRouterState();
  const mainRef = useRef<HTMLElement>(null);
  const isNoneSidebarPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  const { data: meData } = useGetMeQuery();

  const rolesKey = meData?.data?.roles?.join(",") ?? "";

  const managingMenus = useMemo<SidebarMenuType[]>(() => {
    const roles = rolesKey.split(",").filter(Boolean);
    const managingMenus: SidebarMenuType[] = [];

    if (roles.includes("TEACHER")) {
      managingMenus.push({
        text: "외박 관리",
        herf: "/teacher/outsleeping",
      });
    }

    if (roles.includes("DORMITORY_MANAGER")) {
      managingMenus.push({
        text: "심자 관리",
        herf: "/dormitory/night-study",
      });
    }

    if (roles.includes("ADMIN")) {
      managingMenus.push({
        text: "어드민",
        herf: "/admin",
      });
    }

    return managingMenus;
  }, [rolesKey]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (isNoneSidebarPage) {
    return <Outlet />;
  }

  return (
    <div className="relative flex justify-center w-full h-screen bg-background-default">
      <div className="flex justify-center w-lg max-w-lg grow min-h-0 gap-8">
        <Sidebar
          isMobile={isMobile}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          menus={MENUS}
          managingMenus={managingMenus}
          logo={
            <div className="flex w-12 h-12">
              <img src="/favicon.svg" alt="dodam-logo" className="w-12 h-12" />
            </div>
          }
        />

        <main
          ref={mainRef}
          className="flex grow min-h-0 flex-col overflow-y-auto py-7 sm:pr-8 max-sm:py-5 max-sm:px-5"
        >
          <div className="flex min-h-full flex-col">
            <Outlet />
            <div className="h-9 shrink-0" />
          </div>
        </main>
      </div>
    </div>
  );
}
