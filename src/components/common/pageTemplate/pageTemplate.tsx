import { ReactNode } from "react";
import { PageTemplateContainer, PageTemplateWrap } from "./style";

type Props = {
  children: ReactNode;
};

const PageTemplate = ({ children }: Props) => {
  return (
    <PageTemplateContainer>
      <PageTemplateWrap>{children}</PageTemplateWrap>
    </PageTemplateContainer>
  );
};

export default PageTemplate;
