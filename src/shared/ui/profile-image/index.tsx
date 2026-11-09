import { useState, type ImgHTMLAttributes } from "react";
import { Avatar } from "@b1nd/dodam-design-system/components";

interface ProfileImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
  src?: string | null;
  size: number;
}

const ProfileImage = ({ src, size, ...imgProps }: ProfileImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return <Avatar size={size} />;
  }

  return <img {...imgProps} src={src} onError={() => setFailedSrc(src)} />;
};

export default ProfileImage;
