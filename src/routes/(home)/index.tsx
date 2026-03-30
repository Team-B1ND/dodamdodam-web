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
    <div className="flex grow gap-6 h-full">
      <div className="flex flex-col gap-4 grow">
        <header className="flex justify-center items-center bg-background-surface aspect-[6.8/1] rounded-large">
          Header
        </header>
        <main className="grid grid-cols-2 grow gap-4">
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
      <Suspense fallback={<UserProfile.Skeleton />}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
