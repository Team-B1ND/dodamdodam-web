import { colors } from "@b1nd/dodam-design-system/colors";
import { Link, useLocation } from "@tanstack/react-router";
import type { FC } from "react";

interface Props {
  Icon: FC<{ 
    color?: string;
    pointer?: boolean;
  }>;
  text: string;
  herf: string;
  onClick?: () => void;
}

const SidebarItem = ({
  Icon,
  text,
  herf,
  onClick
}: Props) => {
  const { pathname } = useLocation();
  const isParentActive = pathname === herf || pathname.startsWith(`${herf}/`);

  return (
    <Link
      to={herf}
      className={`flex self-stretch items-center outline-none rounded-large ${isParentActive ? "bg-brand-primary" : ""}`}
      onClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {Icon && (
          <Icon
            color={isParentActive ? colors.static.white : colors.text.primary}
            pointer
          />
        )}
      </div>
      <p className={isParentActive ? "text-static-white" : "text-text-primary"}>
        {text}
      </p>
    </Link>
  );
}

export default SidebarItem