import { createFileRoute, Link } from "@tanstack/react-router";
import LoginCard from "@/features/login/ui/LoginCard";

export const Route = createFileRoute("/login/")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirectUrl: search.redirectUrl as string | undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background-default px-4 py-12 md:gap-0 md:px-0 md:py-0">
      <LoginCard />
      <p className="text-sm font-medium tracking-[0.28px] text-text-placeholder md:absolute md:bottom-21">
        계정이 없으시다면?{" "}
        <Link to="/register" className="cursor-pointer text-text-primary underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
