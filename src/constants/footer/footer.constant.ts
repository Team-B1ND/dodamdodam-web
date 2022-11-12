import { RiGooglePlayFill } from "@react-icons/all-files/ri/RiGooglePlayFill";
import { RiAppleFill } from "@react-icons/all-files/ri/RiAppleFill";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { AiFillYoutube } from "@react-icons/all-files/ai/AiFillYoutube";
import { ImFacebook } from "@react-icons/all-files/im/ImFacebook";

export const FOOTER_ITEMS = [
  {
    title: "안내",
    items: [
      {
        title: "개인정보취급방침",
        link: "http://dodam.b1nd.com/detailed-information/personal-information",
      },
      {
        title: "운영정책",
        link: "http://dodam.b1nd.com/detailed-information/service-policy",
      },
      { title: "아이콘 출처", link: "http://dodam.b1nd.com/about" },
    ],
  },
  {
    title: "소셜",
    items: [
      {
        title: "유튜브",
        link: "https://www.youtube.com/c/%EB%8C%80%EA%B5%AC%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%EB%A7%88%EC%9D%B4%EC%8A%A4%ED%84%B0%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90",
      },
      {
        title: "인스타그램",
        link: "https://www.instagram.com/dgsw.it/",
      },
      {
        title: "페이스북",
        link: "https://www.facebook.com/dgsw.hs.kr",
      },
    ],
  },
  {
    title: "다운로드",
    items: [
      {
        title: "안드로이드",
        link: "https://play.google.com/store/apps/details?id=kr.hs.dgsw.smartschool.dodamdodam",
      },
      {
        title: "애플",
        link: "https://apps.apple.com/kr/app/%EB%8F%84%EB%8B%B4%EB%8F%84%EB%8B%B4/id1549451556",
      },
    ],
  },
  {
    title: "도담도담",
    items: [
      {
        title: "일정",
        link: "http://dodam.b1nd.com/schedule",
      },
      {
        title: "기상송",
        link: "http://dodam.b1nd.com/wakesong",
      },
      {
        title: "내정보",
        link: "http://dodam.b1nd.com/myinfo",
      },
      {
        title: "잇맵",
        link: "http://dodam.b1nd.com/itmap",
      },
      {
        title: "분실물",
        link: "http://dodam.b1nd.com/lostfound",
      },
    ],
  },
];

export const FOOTER_SOCIAL_ITEMS = [
  {
    title: "인스타그램",
    icon: AiOutlineInstagram,
    link: "https://www.instagram.com/dgsw.it/",
  },
  {
    title: "페이스북",
    icon: ImFacebook,
    link: "https://www.facebook.com/dgsw.hs.kr",
  },
  {
    title: "유튜브",
    icon: AiFillYoutube,
    link: "https://www.youtube.com/c/%EB%8C%80%EA%B5%AC%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%EB%A7%88%EC%9D%B4%EC%8A%A4%ED%84%B0%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90",
  },
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
