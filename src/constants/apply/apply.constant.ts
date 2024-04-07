export const APPLY_ITEMS = ["외출", "외박", "버스"] as const;

export const APPLY_STUDY_ROOMS_TIMETABLE_WEEKDAY = [
  {
    timeTitle: "8교시",
    time: "17:00 ~ 17:20",
    timeOut: "17:00",
    timeTableIdx: 1,
  },
  {
    timeTitle: "9교시",
    time: "17:30 ~ 18:20",
    timeOut: "17:30",
    timeTableIdx: 2,
  },
  {
    timeTitle: "10교시",
    time: "19:10 ~ 20:00",
    timeOut: "19:10",
    timeTableIdx: 3,
  },
  {
    timeTitle: "11교시",
    time: "20:10 ~ 21:00",
    timeOut: "20:10",
    timeTableIdx: 4,
  },
] as const;

export const APPLY_STUDY_ROOMS_TIMETABLE_WEEKEND = [
  {
    timeTitle: "오전 1",
    time: "09:20 ~ 10:00",
    timeOut: "09:20",
    timeTableIdx: 5,
  },
  {
    timeTitle: "오전 2",
    time: "10:00 ~ 12:00",
    timeOut: "10:00",
    timeTableIdx: 6,
  },
  {
    timeTitle: "오후 1",
    time: "13:30 ~ 15:00",
    timeOut: "13:30",
    timeTableIdx: 7,
  },
  {
    timeTitle: "오후 2",
    time: "15:00 ~ 21:00",
    timeOut: "15:00",
    timeTableIdx: 8,
  },
] as const;
