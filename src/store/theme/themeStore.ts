import { atom } from "recoil";
import { ETheme } from "../../enum/theme/theme.enum";
import { getTheme } from "../../util/theme/getTheme";

export const themeMode = atom<ETheme>({
  key: "theme/themeMode",
  default: getTheme(),
});
