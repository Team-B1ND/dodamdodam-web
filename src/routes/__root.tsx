import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";
import Sidebar from "@/widgets/sidebar/ui";
import { MENUS } from "@/widgets/sidebar/constants/sidebar-item";
import LongLogo from "@/shared/assets/icons/dodamLongLogo.svg";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { location } = useRouterState();
  const isLoginPage = location.pathname.startsWith("/login");

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex px-8 py-9 h-screen justify-start items-start gap-6 bg-background-default ">
      <Sidebar
        menus={MENUS}
        logo={
          <div className="p-2">
            <LongLogo />
          </div>
        }
      />
      <main className="flex-1 h-full overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
