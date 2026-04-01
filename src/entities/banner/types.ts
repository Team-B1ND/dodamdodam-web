export interface Banner {
  id: number;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

export type CreateBanner = Omit<Banner, "id" | "isActive">;

export interface PatchBannerStatus {
  id: number;
  active: boolean;
}