import { colors } from "@b1nd/dodam-design-system/colors";
import { ChevronDown, DoorOpen, Menu, Moon, Sun } from "@b1nd/dodam-design-system/icons";
import { toggleTheme, useTheme } from "@b1nd/dodam-design-system/themes";
import type { SidebarMenuType } from "../types/sidebar-item/sidebar-item";
import { type Dispatch, type ReactElement, type SetStateAction } from "react";
import SidebarItem from "./sidebar-item";
import { IconButton, useOverlay } from "@b1nd/dodam-design-system/components";
import { Link, useNavigate } from "@tanstack/react-router";
import LogoutDialog from "@/widgets/sidebar/ui/logout-dialog";

interface Props {
  logo: ReactElement;
  menus: SidebarMenuType[];
  managingMenus: SidebarMenuType[];
  isMobile: boolean;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({
  logo,
  menus,
  managingMenus,
  isMobile,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}: Props) => {
  const theme = useTheme();
  const overlay = useOverlay();
  const navigate = useNavigate({ from: "/" });
  const isSidebarOpen = isMobile ? isMobileSidebarOpen : true;

  const openLogoutDialog = () => {
    overlay.open(({ close, exit }) => {
      const onClose = () => {
        close();
        exit();
      }
      return <LogoutDialog onClose={onClose} moveToLogin={() => navigate({ to: "/login", search: { redirectUrl: "" } })} />
    })
  }

  return (
    <div className="flex z-10 sm:shrink-0 sm:py-7 sm:pl-8 max-sm:absolute max-sm:bottom-8 max-sm:left-8">
      <aside className="items-center p-3 bg-background-surface rounded-2xl flex flex-col h-fit gap-3 overflow-hidden min-w-18 max-sm:shadow-2xl">
        {isSidebarOpen ? (
          <>
            <div className="flex flex-col gap-3 max-sm:hidden">
              <Link to="/">{logo}</Link>
              <div className="h-px bg-border-normal w-full" />
            </div>
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
              <IconButton
                iconSize={24}
                size={48}
                onClick={toggleTheme}
                icon={
                  theme === "light" ? (
                    <Sun color={colors.text.primary} size={24} pointer />
                  ) : (
                    <Moon color={colors.text.primary} size={24} pointer />
                  )
                }
              />
              <button
                onClick={openLogoutDialog}
                className="w-12 h-12 flex justify-center items-center bg-status-error rounded-small cursor-pointer"
              >
                <DoorOpen color={colors.static.white} pointer />
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-col gap-3 sm:hidden">
          {isSidebarOpen ? <div className="h-px bg-border-normal w-full" /> : <></>}
          <IconButton
            iconSize={24}
            size={48}
            onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
            icon={
              isSidebarOpen ? (
                <ChevronDown color={colors.text.primary} pointer />
              ) : (
                <Menu color={colors.text.primary} pointer />
              )
            }
          />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
