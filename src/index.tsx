import ReactDOM from "react-dom/client";
import Root from "./Root";
// import * as Sentry from "@sentry/react";
// import config from "./config/config.json";

// Sentry.init({
//   dsn: config.SENTRY_DSN,
//   environment: process.env.NODE_ENV,
//   integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
//   tracesSampleRate: 1.0,
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
