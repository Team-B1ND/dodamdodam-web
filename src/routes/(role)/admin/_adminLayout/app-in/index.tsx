import AdminAppIn from "@/features/manage-app-in/ui";
import QueryBoundary from "@/shared/ui/query-boundary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(role)/admin/_adminLayout/app-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <QueryBoundary pendingFallback={<AdminAppIn.Skeleton />}>
      <AdminAppIn />
    </QueryBoundary>
  );
}
