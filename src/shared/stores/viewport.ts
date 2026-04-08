import { create } from "zustand";

export const MOBILE_MEDIA_QUERY = "(max-width: 640px)";

interface ViewportState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const getInitialIsMobile = () => {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia !== "function") return false;
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
};

export const useViewportStore = create<ViewportState>((set) => ({
  isMobile: getInitialIsMobile(),
  setIsMobile: (isMobile) => set({ isMobile }),
}));

