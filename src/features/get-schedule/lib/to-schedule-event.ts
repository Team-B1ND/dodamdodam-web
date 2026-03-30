import type { Schedule, ScheduleEvent } from "@/entities/schedule/types";
import { parseScheduleTarget } from "@/features/get-schedule/lib/schedule-target";

export const toScheduleEvent = (schedule: Schedule): ScheduleEvent => {
  const target = schedule.targets[0] ?? "기타";
  const targetMeta = parseScheduleTarget(target);
  const start = schedule.startAt;
  const end = schedule.endAt || start;

  return {
    id: schedule.publicId,
    title: schedule.title,
    target,
    attendees: [targetMeta.label],
    location: "장소 정보 없음",
    category: "time",
    isReadOnly: true,
    borderColor: targetMeta.color,
    backgroundColor: targetMeta.color,
    start,
    end,
    state: null,
  };
};
