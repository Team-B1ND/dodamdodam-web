import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import useTheme from "@src/hooks/theme/useTheme";
import GlobalStyle from "@src/style/global";
import MaterialStyle from "@src/style/material";

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
