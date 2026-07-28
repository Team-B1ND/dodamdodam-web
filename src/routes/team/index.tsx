import Team from "@/features/get-team/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Team />;
}
