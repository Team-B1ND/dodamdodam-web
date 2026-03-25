import { colors } from "@b1nd/dodam-design-system/colors";
import { DoorOpen } from "@b1nd/dodam-design-system/icons";
import { toggleTheme, useTheme } from "@b1nd/dodam-design-system/themes";
import type { SidebarMenuType } from "../types/sidebar-item/sidebar-item";
import type { ReactElement } from "react";
import SidebarItem from "./sidebar-item";

interface Props {
  logo: ReactElement;
  menus: SidebarMenuType[];
}

const Sidebar = ({
  logo,
  menus
}: Props) => {
  const theme = useTheme();
  return (
    <aside className="w-50 h-full p-3 bg-background-surface rounded-2xl inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
      {logo}
      {menus.map((item) => (
        <SidebarItem
          key={item.text}
          Icon={item.icon}
          text={item.text}
          herf={item.herf}
        />
      ))}
      <div className="w-0 flex-1 relative" />
      <div className="flex self-stretch items-center gap-2">
        <button
          onClick={toggleTheme}
          className={`${theme === "light" ? "text-text-primary" : "text-static-white"} text-label font-bold h-9 flex justify-center items-center grow bg-fill-primary rounded-small cursor-pointer`}
        >
          {theme === "light" ? "DARK" : "LIGHT"}
        </button>
        <button onClick={() => alert("Logout !")} className="w-9 h-9 flex justify-center items-center bg-status-error rounded-small cursor-pointer">
          <DoorOpen color={colors.static.white} pointer/>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar