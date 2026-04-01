import CreateBanner from '@/features/create-banner/ui'
import AdminBanner from '@/features/get-banner/ui/AdminBanner';
import QueryBoundary from '@/shared/ui/query-boundary';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(role)/admin/_adminLayout/banner/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex gap-4">
      <QueryBoundary pendingFallback={<AdminBanner.Skeleton />}>
        <AdminBanner />
      </QueryBoundary>
      <CreateBanner />
    </div>
  );
}
