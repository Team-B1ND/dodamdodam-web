export interface DevEvent {
  endDate: string;
  eventType: DevEventType;
  link: string;
  organization: string;
  startDate: string;
  title: string;
}

export type DevEventType = "conference" | "others" | "competition" | "webinar";

export interface DevEventsResponse {
  data: DevEvent[];
}
