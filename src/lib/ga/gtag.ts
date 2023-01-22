import ReactGA from "react-ga4";

interface GtagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const pageView = (pageName: string) => {
  ReactGA.set({ page: pageName });
  ReactGA.send("pageview");
};

export const event = ({ action, category, label, value }: GtagEvent) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
