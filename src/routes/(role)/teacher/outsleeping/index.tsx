import OutSleepingApplications from "@/features/manage-out-sleeping/ui/OutSleepingApplications";
import QueryBoundary from "@/shared/ui/query-boundary";
import { padDate } from "@/shared/utils/pad-date";
import { DatePicker, FilledButton, PickerTrigger } from "@b1nd/dodam-design-system/components";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(role)/teacher/outsleeping/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full h-full bg-background-surface rounded-large p-5 flex flex-col gap-4">
      <PickerTrigger
        content={({ onClose }) => (
          <DatePicker.Content
            date={date}
            onChangeDate={setDate}
            onClose={onClose}
            disablePast
          />
        )}>
        <FilledButton role="assistive" size="large">
          {date ? padDate(date) : "YYYY-MM-DD"}
        </FilledButton>
      </PickerTrigger>
      <QueryBoundary pendingFallback={<OutSleepingApplications.Skeleton />}>
        <OutSleepingApplications date={date} />
      </QueryBoundary>
    </div>
  );
}
