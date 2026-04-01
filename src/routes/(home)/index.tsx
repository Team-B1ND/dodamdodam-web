import HomeBanner from "@/features/get-banner/ui/HomeBanner";
import Meal from "@/features/get-meal/ui";
import ScheduleHome from "@/features/get-schedule/ui/ScheduleHome";
import TimeTable from "@/features/get-time-table/ui";
import UserProfile from "@/features/get-user/ui";
import ManageOutSleeping from "@/features/manage-out-sleeping/ui";
import QueryBoundary from "@/shared/ui/query-boundary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex grow gap-6">
      <div className="flex flex-col gap-4 grow">
        <QueryBoundary pendingFallback={<HomeBanner.Skeleton />}>
          <HomeBanner />
        </QueryBoundary>
        <main className="grid grid-cols-2 max-md:grid-cols-1 gap-4 min-h-0">
          <div className="hidden max-md:flex">
            <QueryBoundary pendingFallback={<UserProfile.Skeleton />}>
              <UserProfile />
            </QueryBoundary>
          </div>
          <div className="flex flex-col gap-4 grow">
            <QueryBoundary pendingFallback={<ScheduleHome.Skeleton />}>
              <ScheduleHome />
            </QueryBoundary>
            <QueryBoundary pendingFallback={<TimeTable.Skeleton />}>
              <TimeTable />
            </QueryBoundary>
          </div>
          <div className="flex flex-col gap-4 grow">
            <QueryBoundary pendingFallback={<Meal.Skeleton />}>
              <Meal />
            </QueryBoundary>
            <ManageOutSleeping />
          </div>
        </main>
      </div>
      <div className="max-md:hidden">
        <QueryBoundary pendingFallback={<UserProfile.Skeleton />}>
          <UserProfile />
        </QueryBoundary>
      </div>
    </div>
  );
}
