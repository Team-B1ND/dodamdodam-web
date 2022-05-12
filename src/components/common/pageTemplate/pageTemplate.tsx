import { ReactNode } from "react";
import Header from "../header/header";
import { PageTemplateContainer, PageTemplateWrap } from "./style";

type Props = {
  children: ReactNode;
};

const PageTemplate = ({ children }: Props) => {
  return (
    <PageTemplateContainer>
      <Header />
      <PageTemplateWrap>{children}</PageTemplateWrap>
    </PageTemplateContainer>
  );
};

export default PageTemplate;
