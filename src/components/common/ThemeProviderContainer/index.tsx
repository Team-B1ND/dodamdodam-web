import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import useTheme from "../../../hooks/theme/useTheme";
import GlobalStyle from "../../../style/global";
import MaterialStyle from "../../../style/material";

type Props = {
  children: ReactNode;
};

const ThemeProviderContainer = ({ children }: Props) => {
  const { themeColor } = useTheme();

  return (
    <ThemeProvider theme={themeColor}>
      <GlobalStyle />
      <MaterialStyle />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderContainer;
