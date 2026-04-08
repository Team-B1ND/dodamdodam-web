import { useEffect } from "react";
import { MOBILE_MEDIA_QUERY, useViewportStore } from "@/shared/stores/viewport";

export const useViewportSync = () => {
  const setIsMobile = useViewportStore((state) => state.setIsMobile);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    // Ensure store matches current viewport on mount.
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

    // Safari < 14 uses addListener/removeListener
    mediaQuery.addListener(handleChange);
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, [setIsMobile]);
};

