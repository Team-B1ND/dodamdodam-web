import { useViewportStore } from "@/shared/stores/viewport";

export const useIsMobile = () => useViewportStore((state) => state.isMobile);

