export interface DevEvent {
  applicant_count: number;
  categories: DevEventTag[];
  id: number;
  images: DevEventImage;
  metadata: DevEventMetaData;
}

export interface DevEventImage {
  dashboard_img: null;
  fb_share_img: string;
  main_img: null;
  thumbnail_img: string;
}

export type DevEventLabelType =
  | "article"
  | "video"
  | "education"
  | "community"
  | "event"
  | "promotion";

export interface DevEventMetaData {
  closed: boolean;
  country: string;
  description: string;
  detail_profile: string;
  end_time: string;
  is_apply_slack: boolean;
  is_count_visible: boolean;
  is_online: boolean;
  is_privacy_required: boolean;
  is_sms: boolean;
  key: string;
  label: DevEventLabelType;
  limit: null;
  organizer: string;
  organizer_id: number;
  start_time: string;
  sub_title: string;
  title: string;
  type: string;
  visible: boolean;
  where: string;
}

export interface DevEventTag {
  count_job: number;
  count_job_ko: number;
  count_user: number;
  i18n_key: string;
  icon_img: null;
  id: number;
  kind: number;
  taggable_id: null;
  title: string;
  title_thumb_img: null;
}

export interface DevEventsResponse {
  data: DevEvent[];
}
