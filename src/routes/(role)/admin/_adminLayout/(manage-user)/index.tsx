import { useFilterUser } from '@/features/manage-user/model/useFilterUser'
import ManageUserFilter from '@/features/manage-user/ui/filter'
import ManageUserTable from '@/features/manage-user/ui/table';
import QueryBoundary from '@/shared/ui/query-boundary';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(role)/admin/_adminLayout/(manage-user)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const props = useFilterUser();

  return (
    <div className="flex flex-col large-container gap-5 h-[85%]">
      <ManageUserFilter {...props} />
      <QueryBoundary
        pendingFallback={<div className="flex-1 rounded-medium skeleton" />}
      >
        <ManageUserTable
          keyword={props.keyword}
          selectedStatus={props.selectedStatus}
          roles={props.roles}
          generationOnly={props.generationOnly}
        />
      </QueryBoundary>
    </div>
  );
}
