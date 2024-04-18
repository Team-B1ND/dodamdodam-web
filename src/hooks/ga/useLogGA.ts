import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import CONFIG from "@src/config/config.json";

export const useLogGA = () => {
  const app = initializeApp(CONFIG.GOOGLE_ANALYTICS);
  const analytics = getAnalytics(app);

  const handleGALogEvent = (view: string) => {
    logEvent(analytics, view);
  };

  return {
    handleGALogEvent,
  };
};
