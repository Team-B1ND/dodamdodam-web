export interface Conference {
  applicant_count: number;
  categories: ConferenceTag[];
  id: number;
  images: ConferenceImage;
  metadata: ConferenceMetaData;
}

export interface ConferenceImage {
  dashboard_img: null;
  fb_share_img: string;
  main_img: null;
  thumbnail_img: string;
}

export type ConferenceLabelType =
  | "article"
  | "video"
  | "education"
  | "community"
  | "event";

export interface ConferenceMetaData {
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
  label: ConferenceLabelType;
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

export interface ConferenceTag {
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

export interface ConferencesResponse {
  data: Conference[];
}
