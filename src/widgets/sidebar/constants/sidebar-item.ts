import type { SidebarMenuType } from "@/widgets/sidebar/types/sidebar-item/sidebar-item";
import { Calendar, Chart, Home, MoonPlus } from "@b1nd/dodam-design-system/icons";

export const MENUS: SidebarMenuType[] = [
  {
    text: "홈",
    herf: "/",
    icon: Home,
  },
  {
    text: "일정",
    herf: "/schedule",
    icon: Calendar,
  },
  // {
  //   text: "급식",
  //   herf: "/meal",
  //   icon: ForkAndKnife,
  // },
  {
    text: "심야자습",
    herf: "/night-study",
    icon: MoonPlus,
  },
  // {
  //   text: "동아리",
  //   herf: "/club",
  //   icon: Person,
  // },
  {
    text: "디깃",
    herf: "https://dgit.b1nd.com/",
    icon: Chart,
  },
];