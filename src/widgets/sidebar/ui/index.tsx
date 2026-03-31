import { colors } from "@b1nd/dodam-design-system/colors";
import { DoorOpen, Moon, Sun } from "@b1nd/dodam-design-system/icons";
import { toggleTheme, useTheme } from "@b1nd/dodam-design-system/themes";
import type { SidebarMenuType } from "../types/sidebar-item/sidebar-item";
import type { ReactElement } from "react";
import SidebarItem from "./sidebar-item";
import { IconButton } from "@b1nd/dodam-design-system/components";
import { Link } from "@tanstack/react-router";

interface Props {
  logo: ReactElement;
  menus: SidebarMenuType[];
  managingMenus: SidebarMenuType[];
}

const Sidebar = ({ logo, menus, managingMenus }: Props) => {
  const theme = useTheme();
  return (
    <aside className="items-center p-4 bg-background-surface rounded-2xl flex flex-col h-fit gap-3 overflow-hidden min-w-20">
      <Link to="/">{logo}</Link>
      <div className="h-px bg-border-normal w-full" />
      {menus.map((item) => (
        <SidebarItem
          key={item.text}
          Icon={item.icon}
          text={item.text}
          herf={item.herf}
        />
      ))}
      <div className="h-px bg-border-normal w-full" />
      {managingMenus.map((item) => (
        <SidebarItem
          key={item.text}
          Icon={item.icon}
          text={item.text}
          herf={item.herf}
          isManagingMenu
        />
      ))}
      {managingMenus.length !== 0 ? (
        <div className="h-px bg-border-normal w-full" />
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-2">
        {theme === "light" ? (
          <IconButton
            iconSize={24}
            size={48}
            onClick={toggleTheme}
            icon={<Moon color={colors.text.primary} size={24} pointer />}
          />
        ) : (
          <IconButton
            iconSize={24}
            size={48}
            onClick={toggleTheme}
            icon={<Sun color={colors.text.primary} size={24} pointer />}
          />
        )}
        <button
          onClick={() => alert("Logout !")}
          className="w-12 h-12 flex justify-center items-center bg-status-error rounded-small cursor-pointer"
        >
          <DoorOpen color={colors.static.white} pointer />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
