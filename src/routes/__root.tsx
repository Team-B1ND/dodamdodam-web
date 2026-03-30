import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";
import Sidebar from "@/widgets/sidebar/ui";
import { MENUS } from "@/widgets/sidebar/constants/sidebar-item";
import Logo from "@/shared/assets/icons/dodamLogo.svg";

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
    <div className="flex px-8 pt-9 h-screen justify-start items-start gap-6 bg-background-default ">
      <Sidebar
        menus={MENUS}
        logo={
          <div className="flex w-12 h-12">
            <Logo />
          </div>
        }
      />
      <main className="flex-1 h-full overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
