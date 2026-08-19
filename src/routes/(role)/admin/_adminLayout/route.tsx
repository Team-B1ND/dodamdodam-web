import { useGetMeQuery } from "@/entities/user/queries";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";

const ADMIN_PAGES: SegmentedButtonData[] = [
  { text: "유저", value: "", isActive: false },
  { text: "배너", value: "banner", isActive: false },
  { text: "앱인도담", value: "app-in", isActive: false },
];

const getActivePage = (pathname: string) => {
  if (pathname.startsWith("/admin/app-in")) return "app-in";
  if (pathname.startsWith("/admin/banner")) return "banner";
  return "";
};

export const Route = createFileRoute("/(role)/admin/_adminLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const [pages, setPages] = useState(ADMIN_PAGES);
  const activePage = getActivePage(pathname);
  const pageData = pages.map((page) => ({
    ...page,
    isActive: page.value === activePage,
  }));
  const navigate = useNavigate();
  const { data: meData, isPending, isError } = useGetMeQuery();
  const isAdmin = meData?.data.roles.includes("ADMIN") ?? false;

  if (isPending) {
    return <div className="large-container h-16 skeleton" />;
  }

  if (isError || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-fit min-h-0 flex-col gap-4">
      <header className="large-container">
        <SegmentedButton
          data={pageData}
          setData={setPages}
          onBlockClick={(v) => navigate({ to: `/admin/${v}` })}
          width="22.5rem"
        />
      </header>
      <Outlet />
    </div>
  );
}
