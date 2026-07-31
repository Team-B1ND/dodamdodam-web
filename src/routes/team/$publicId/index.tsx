import TeamDetailPage from "@/features/team/ui/TeamDetailPage";
import QueryBoundary from "@/shared/ui/query-boundary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$publicId/")({
  component: TeamDetailRoute,
});

function TeamDetailRoute() {
  const { publicId } = Route.useParams();

  return (
    <QueryBoundary pendingFallback={<TeamDetailPage.Skeleton />}>
      <TeamDetailPage publicId={publicId} />
    </QueryBoundary>
  );
}
