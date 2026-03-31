import Schedule from "@/features/get-schedule/ui";
import QueryBoundary from "@/shared/ui/query-boundary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/schedule/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <QueryBoundary pendingFallback={<Schedule.Skeleton />}>
      <Schedule />
    </QueryBoundary>
  );
}
