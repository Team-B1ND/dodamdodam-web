import Banner from "@/features/get-banner/ui";
import Meal from "@/features/get-meal/ui";
import ScheduleHome from "@/features/get-schedule/ui/ScheduleHome";
import TimeTable from "@/features/get-time-table/ui";
import UserProfile from "@/features/get-user/ui";
import ManageOutSleeping from "@/features/manage-out-sleeping/ui";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex grow gap-6">
      <div className="flex flex-col gap-4 grow">
        <Suspense fallback={<Banner.Skeleton />}>
          <Banner />
        </Suspense>
        <main className="grid grid-cols-2 max-md:grid-cols-1 gap-4 min-h-0">
          <div className="hidden max-md:flex">
            <Suspense fallback={<UserProfile.Skeleton />}>
              <UserProfile />
            </Suspense>
          </div>
          <div className="flex flex-col gap-4 grow">
            <Suspense fallback={<ScheduleHome.Skeleton />}>
              <ScheduleHome />
            </Suspense>
            <Suspense fallback={<TimeTable.Skeleton />}>
              <TimeTable />
            </Suspense>
          </div>
          <div className="flex flex-col gap-4 grow">
            <Suspense fallback={<Meal.Skeleton />}>
              <Meal />
            </Suspense>
            <ManageOutSleeping />
          </div>
        </main>
      </div>
      <div className="max-md:hidden">
        <Suspense fallback={<UserProfile.Skeleton />}>
          <UserProfile />
        </Suspense>
      </div>
    </div>
  );
}
