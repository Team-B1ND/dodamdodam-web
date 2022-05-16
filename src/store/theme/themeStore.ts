import { atom } from "recoil";
import { ETheme } from "../../enum/theme/theme.enum";
import { getTheme } from "../../util/theme/getTheme";

export const themeModeAtom = atom<ETheme>({
  key: "theme/themeModeAtom",
  default: getTheme(),
});
