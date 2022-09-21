import ReactDOM from "react-dom/client";
import Root from "./Root";
import { init, track } from "@amplitude/analytics-browser";

init("70a67abfc1699b9034b81c930bc31b99");
track("메인페이지 접속");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
