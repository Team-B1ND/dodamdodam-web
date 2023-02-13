import Routes from "./routes";
import { init, track } from "@amplitude/analytics-browser";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { pageView } from "../lib/ga/gtag";
import useTokenCheck from "../hooks/auth/useTokenCheck";

const App = () => {
  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      if (process.env.GOOGLE_ANALYTICS_ID) {
        ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
        pageView("메인페이지");
      }

      if (process.env.AMPLITUDE_KEY) {
        init(process.env.AMPLITUDE_KEY);
        track("메인페이지 접속");
      }
    }
  }, []);

  useTokenCheck();

  return <Routes />;
};

export default App;
