import Schedule from "@/features/get-schedule/ui";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/schedule/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<Schedule.Skeleton />}>
      <Schedule />
    </Suspense>
  );
}
