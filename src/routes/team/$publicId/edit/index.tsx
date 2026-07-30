import TeamManagePage from "@/features/team/ui/TeamManagePage";
import QueryBoundary from "@/shared/ui/query-boundary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$publicId/edit/")({
  component: TeamManageRoute,
});

function TeamManageRoute() {
  const { publicId } = Route.useParams();

  return (
    <QueryBoundary pendingFallback={<TeamManagePage.Skeleton />}>
      <TeamManagePage publicId={publicId} />
    </QueryBoundary>
  );
}
