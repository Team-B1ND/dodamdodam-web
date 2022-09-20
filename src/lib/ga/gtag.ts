interface GtagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const pageView = () => {
  window.gtag("config", process.env.GOOGLE_ANALYTICS_ID!, {
    page_path: "메인페이지",
  });
};

export const event = ({ action, category, label, value }: GtagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
