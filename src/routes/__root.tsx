import {
  Outlet,
  createRootRoute,
  type ErrorComponentProps,
  useRouterState,
} from "@tanstack/react-router";
import Sidebar from "@/widgets/sidebar/ui";
import { MENUS } from "@/widgets/sidebar/constants/sidebar-item";
import { useGetMeQuery } from "@/entities/user/queries";
import { DoorOpen, MoonPlus } from "@b1nd/dodam-design-system/icons";
import { useEffect, useMemo, useRef } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "@/shared/ui/error-fallback";
import type { SidebarMenuType } from "@/widgets/sidebar/types/sidebar-item/sidebar-item";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
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
        icon: DoorOpen,
      });
    }

    if (roles.includes("DORMITORY_MANAGER")) {
      managingMenus.push({
        text: "심자 관리",
        herf: "/dormitory/night-study",
        icon: MoonPlus,
      });
    }

    return managingMenus;
  }, [rolesKey]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  if (isNoneSidebarPage) {
    return <Outlet />;
  }

  return (
    <div className="flex justify-center w-full h-screen bg-background-default">
      <div className="flex justify-center w-lg max-w-lg grow min-h-0 gap-8">
        <div className="flex shrink-0 py-7 pl-8">
          <Sidebar
            menus={MENUS}
            managingMenus={managingMenus}
            logo={
              <div className="flex w-12 h-12">
                <img src="/favicon.svg" alt="dodam-logo" className="w-12 h-12" />
              </div>
            }
          />
        </div>

        <main
          ref={mainRef}
          className="flex grow min-h-0 flex-col overflow-y-auto py-7 pr-8"
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
