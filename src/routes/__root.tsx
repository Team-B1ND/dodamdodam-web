import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import Sidebar from "@/widgets/sidebar/ui";
import { MENUS } from "@/widgets/sidebar/constants/sidebar-item";
import { useGetMeQuery } from "@/entities/user/queries";
import { DoorOpen, MoonPlus } from "@b1nd/dodam-design-system/icons";
import { useMemo } from "react";
import type { SidebarMenuType } from "@/widgets/sidebar/types/sidebar-item/sidebar-item";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { location } = useRouterState();
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

  if (isNoneSidebarPage) {
    return <Outlet />;
  }

  return (
    <div className="flex w-full max-w-lg h-screen bg-background-default">
      <div className="pl-8 pt-9">
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

      <main className="flex-1 flex-col overflow-y-auto min-h-0 px-8 pt-9">
        <Outlet />
        <div className="h-9" />
      </main>
    </div>
  );
}
