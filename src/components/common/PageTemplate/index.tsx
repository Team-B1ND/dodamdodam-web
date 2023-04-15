import { ReactNode } from "react";
import DarkModeButton from "../DarkmodeButton";
import Footer from "../Footer";
import Header from "../Header";
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
