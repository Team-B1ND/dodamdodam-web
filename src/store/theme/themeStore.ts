import { atom } from "recoil";
import { ETheme } from "@src/enum/theme/theme.enum";
import { getTheme } from "@src/util/theme/getTheme";

export const themeModeAtom = atom<ETheme>({
  key: "theme/themeModeAtom",
  default: getTheme(),
});