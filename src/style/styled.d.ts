import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    backgroundColor2: string;
    borderColor: string;
    contrast: string;
    contrast2: string;
    hoverColor: string;
    headerBoxShadow: string;
  }
}
