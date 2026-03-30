import RegisterCard from "@/features/register/ui/RegisterCard";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background-default px-4 py-12 md:gap-0 md:px-0 md:py-0">
      <p className="text-sm font-medium tracking-[0.28px] text-text-placeholder md:absolute md:bottom-21">
        이미 계정이 있다면?{" "}
        <Link
          search={{ redirectUrl: undefined }}
          to="/login"
          className="cursor-pointer text-text-primary underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
