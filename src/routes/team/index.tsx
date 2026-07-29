import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/team/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div></div>
  );
}