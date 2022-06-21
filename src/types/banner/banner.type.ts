import { Response } from "../util/response.type";

export interface Banner {
  bannerOrder: number | null;
  createdAt: string;
  expireTime: string;
  idx: number;
  image: string;
  isValid: number;
  title: string;
  url: string;
}

export interface BannersResponse extends Response {
  data: {
    banners: Banner[];
  };
}
