import TeamCreatePage from "@/features/team/ui/TeamCreatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/create/")({
  component: TeamCreatePage,
});
