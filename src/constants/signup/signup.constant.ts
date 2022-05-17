export const SIGNUP_PART_NAME = [
  {
    title: "first",
  },
  { title: "second" },
] as const;

export const SIGNUP_AGREE = [
  { order: "first", title: "운영정책 동의", detailInfoLink: "service-policy" },
  {
    order: "second",
    title: "개인정보취급방침 동의",
    detailInfoLink: "personal-information",
  },
] as const;
