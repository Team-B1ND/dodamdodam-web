import {
  CardTitleContainer,
  CardTitleIcon,
  CardTitleRedirectIcon,
  CardTitleRedirectWrap,
  CardTitleText,
} from "./style";
import { FiChevronRight } from "react-icons/fi";
import { ReactNode } from "react";

type Props = {
  title: string;
  titleIcon: JSX.Element;
  redirectURL: string;
  children?: ReactNode;
};

const CardTitle = ({ title, titleIcon, redirectURL, children }: Props) => {
  return (
    <CardTitleContainer>
      <CardTitleIcon>{titleIcon}</CardTitleIcon>
      <CardTitleText onClick={() => window.open(redirectURL)}>
        {title}
      </CardTitleText>
      {children}
      <CardTitleRedirectWrap onClick={() => window.open(redirectURL)}>
        더보기
        <CardTitleRedirectIcon>
          <FiChevronRight />
        </CardTitleRedirectIcon>
      </CardTitleRedirectWrap>
    </CardTitleContainer>
  );
};

export default CardTitle;
