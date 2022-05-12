import { DefaultTheme } from "styled-components";
import { palette } from "./palette";

export const lightTheme: DefaultTheme = {
  ...palette,

  backgroundColor: "#f0f2f4",
  backgroundColor2: "#ffffff",
  borderColor: "#3d3d3d",
  contrast: "#000000",
  hoverColor: "#e2e2e2",
};

export const darkTheme: DefaultTheme = {
  ...palette,

  backgroundColor: "#1a1a1a",
  backgroundColor2: "#3d3d3d",
  borderColor: "#d2d2d2",
  contrast: "#ffffff",
  hoverColor: "#e2e2e2",
};
