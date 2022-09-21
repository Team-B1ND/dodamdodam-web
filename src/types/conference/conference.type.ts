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
  tags: ConferenceTag[];
  title: string;
}

export interface Competition {
  award_set: string[];
  benefit_set: string[];
  dday: string;
  id: number;
  name: string;
  organization: string;
  photos: CompetitionImage[];
}

export interface CompetitionImage {
  caption: string;
  id: number;
  img_file: string;
  thumbnail_file: string;
}

export interface ConferenceTag {
  id: number;
  tag_color: string;
  tag_name: string;
}

export interface CompetitionResponse {
  data: {
    results: Competition[];
  };
}

export interface ConferencesResponse {
  0: {
    dev_event: Conference[];
  };
}
