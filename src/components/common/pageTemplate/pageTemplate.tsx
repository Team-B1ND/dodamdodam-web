import { ReactNode } from "react";
import DarkModeButton from "../drakmodeButton/darkmodeButton";
import Footer from "../footer/footer";
import Header from "../header/header";
import { PageTemplateContainer, PageTemplateWrap } from "./style";

interface Props {
  children: ReactNode;
}

const PageTemplate = ({ children }: Props) => {
  return (
    <>
      <PageTemplateContainer>
        <Header />
        <PageTemplateWrap>{children}</PageTemplateWrap>
        <DarkModeButton />
        <Footer />
      </PageTemplateContainer>
    </>
  );
};

export default PageTemplate;
