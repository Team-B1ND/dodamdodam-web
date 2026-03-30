export interface Schedule {
  publicId: string;
  title: string;
  startAt: string;
  endAt: string;
  targets: string[];
}

export interface ScheduleEvent {
  id: string;
  title: string;
  target: string;
  attendees: string[];
  location: string;
  category: "time";
  isReadOnly: true;
  borderColor: string;
  backgroundColor: string;
  start: string;
  end: string;
  state: null;
}
