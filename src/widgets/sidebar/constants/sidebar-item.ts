"use client"

import { Calendar, Chart, ForkAndKnife, Home, MoonPlus, Person } from "@b1nd/dodam-design-system/icons";
import { SidebarMenuType } from "@src/widgets/sidebar/types/sidebar-item/sidebar-item";

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
  {
    text: "급식",
    herf: "/meal",
    icon: ForkAndKnife,
  },
  {
    text: "심야자습",
    herf: "/nightstudy",
    icon: MoonPlus,
  },
  {
    text: "동아리",
    herf: "/club",
    icon: Person,
  },
  {
    text: "digt",
    herf: "https://dgit.b1nd.com/",
    icon: Chart,
  },
];