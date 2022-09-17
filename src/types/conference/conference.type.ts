export interface Conference {
  cover_image_link: string;
  create_date_time: string;
  description: string;
  display_sequence: number;
  end_date_time: string;
  end_day_week: string;
  end_time: string;
  event_link: string;
  event_time_type: string;
  id: number;
  organizer: string;
  start_date_time: string;
  start_day_week: string;
  start_time: string;
}

export interface ConferencesResponse {
  0: {
    dev_event: Conference[];
  };
}
