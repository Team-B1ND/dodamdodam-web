import { useEffect } from "react";
import { MOBILE_MEDIA_QUERY, useViewportStore } from "@/shared/stores/viewport";

export const useViewportSync = () => {
  const setIsMobile = useViewportStore((state) => state.setIsMobile);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    // 생성 시 스토어의 뷰포트가 현재 뷰포트와 일치하는지 확인
    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [setIsMobile]);
};

