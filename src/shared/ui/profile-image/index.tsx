import { useState, type ImgHTMLAttributes } from "react";
import { Avatar } from "@b1nd/dodam-design-system/components";

interface ProfileImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
  src?: string | null;
  size: number;
}

const EMPTY_SRC_VALUES = ["", "null", "undefined"];

const normalizeSrc = (src?: string | null) => {
  const trimmed = src?.trim();
  if (!trimmed || EMPTY_SRC_VALUES.includes(trimmed.toLowerCase())) {
    return null;
  }
  return trimmed;
};

const ProfileImage = ({ src: rawSrc, size, ...imgProps }: ProfileImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = normalizeSrc(rawSrc);

  if (!src || failedSrc === src) {
    return <Avatar size={size} />;
  }

  return <img {...imgProps} src={src} onError={() => setFailedSrc(src)} />;
};

export default ProfileImage;
