export interface App {
  appId: string;
  name: string;
  subtitle: string;
  iconUrl: string;
  isVisible: boolean;
}

export interface AppDetail {
  appId: string;
  teamId: string;
  name: string;
  subtitle: string;
  iconUrl: string;
  active: boolean;
  releases: AppRelease[];
}

export type AppReleaseStatus = "ALLOWED" | "PENDING" | "DENIED";

export interface AppRelease {
  releaseId: string;
  releaseUrl: string;
  status: AppReleaseStatus;
  enabled: boolean;
}

export interface DenyAppReleaseRequest {
  releaseId: string;
  denyResult?: string;
}
