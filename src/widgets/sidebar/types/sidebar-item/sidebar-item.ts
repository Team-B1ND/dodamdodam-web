import { FC } from "react";

export type SidebarMenuVariable = "home" | "schedule" | "wakeupsong" | "nightstudy" | "club" | "dgit"

export interface SidebarMenuType {
  text: string;
  herf: string;
  icon: FC;
}