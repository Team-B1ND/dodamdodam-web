export type UploadFileType = "IMAGE" | "GIF" | "VIDEO" | "AUDIO" | "DOCUMENT";

export interface UploadedImage {
  url: string;
  originalFilename: string;
  contentType: string;
  size: number;
}

export interface UploadImageRequest {
  file: File;
  allowType: UploadFileType;
  width?: number;
  height?: number;
}
