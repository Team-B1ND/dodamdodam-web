import { THEME_KEY } from "@src/constants/theme/theme.contant";
import { ETheme } from "@src/enum/theme/theme.enum";
import cookie from "@src/lib/cookie/cookie";

export const getTheme = (): ETheme => {
  const themeMode = cookie.getCookie(THEME_KEY);

  if (typeof window !== "undefined" && !themeMode) {
    const isDarkTheme: boolean = window.matchMedia(
      `(prefers-color-scheme: dark)`
    ).matches;

    if (isDarkTheme) {
      return ETheme.DARK;
    }
    return ETheme.LIGHT;
  }

  const theme: ETheme = themeMode as ETheme;

  if (theme === ETheme.DARK) {
    return ETheme.DARK;
  }

  return ETheme.LIGHT;
};
