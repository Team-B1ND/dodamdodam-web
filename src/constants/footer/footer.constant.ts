import { RiGooglePlayFill } from "@react-icons/all-files/ri/RiGooglePlayFill";
import { RiAppleFill } from "@react-icons/all-files/ri/RiAppleFill";

export const FOOTER_ITEMS = [
  {
    title: "개인정보취급방침",
    link: "/detailed-information/personal-information",
  },
  {
    title: "운영정책",
    link: "/detailed-information/service-policy",
  },
  { title: "아이콘 출처", link: "/about" },
];

export const FOOTER_MOBILE_ITEMS = [
  {
    icon: RiGooglePlayFill,
    title: "Google Play",
    link: "https://play.google.com/store/apps/details?id=kr.hs.dgsw.smartschool.dodamdodam",
  },
  {
    icon: RiAppleFill,
    title: "App Store",
    link: "https://apps.apple.com/kr/app/%EB%8F%84%EB%8B%B4%EB%8F%84%EB%8B%B4/id1549451556",
  },
];
