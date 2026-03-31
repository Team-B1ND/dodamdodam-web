import { colors } from "@b1nd/dodam-design-system/colors";
import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { type FC, useState } from "react";

interface Props {
  Icon: FC<{
    color?: string;
    pointer?: boolean;
  }>;
  text: string;
  herf: string;
  onClick?: () => void;
  isManagingMenu?: boolean;
}

const SidebarItem = ({
  Icon,
  text,
  herf,
  onClick,
  isManagingMenu = false,
}: Props) => {
  const { pathname } = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const isParentActive =
    pathname === herf || (herf !== "/" && pathname.startsWith(herf));
  const isHighlighted = isParentActive || isHovered;
  const backgroundClass = isParentActive
    ? "bg-brand-primary pb-2"
    : isHovered || isManagingMenu
      ? "bg-fill-primary pb-2"
      : "";
  const shouldWrapText = text.length >= 4;
  const splitIndex = shouldWrapText ? Math.ceil(text.length / 2) : text.length;
  const firstLineText = text.slice(0, splitIndex);
  const secondLineText = shouldWrapText ? text.slice(splitIndex) : "";

  return (
    <Link
      to={herf}
      className={`w-12 p-3 gap-1 flex flex-col items-center outline-none rounded-small ${backgroundClass}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {Icon && (
        <Icon
          color={isParentActive ? colors.static.white : colors.text.primary}
          pointer
        />
      )}
      {isManagingMenu ? (
        <span className="flex w-8 flex-col items-center text-caption2 font-medium leading-tight text-text-primary">
          <span>{firstLineText}</span>
          {secondLineText && <span>{secondLineText}</span>}
        </span>
      ) : (
        <motion.div
          initial={false}
          animate={{
            height: isHighlighted ? "auto" : 0,
            marginTop: isHighlighted ? 0 : -4,
            opacity: isHighlighted ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="overflow-hidden">
          <motion.span
            initial={false}
            animate={{
              y: isHighlighted ? 0 : -4,
              scale: isHighlighted ? 1 : 0.96,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`flex w-8 flex-col items-center text-caption2 font-medium leading-tight ${isParentActive ? "text-static-white" : "text-text-primary"}`}>
            <span>{firstLineText}</span>
            {secondLineText && <span>{secondLineText}</span>}
          </motion.span>
        </motion.div>
      )}
    </Link>
  );
};

export default SidebarItem;
