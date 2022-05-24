import {
  CardTitleContainer,
  CardTitleIcon,
  CardTitleRedirectIcon,
  CardTitleRedirectWrap,
  CardTitleText,
} from "./style";
import { FiChevronRight } from "react-icons/fi";

type Props = {
  title: string;
  titleIcon: JSX.Element;
  redirectURL: string;
};

const CardTitle = ({ title, titleIcon, redirectURL }: Props) => {
  return (
    <CardTitleContainer>
      <CardTitleIcon>{titleIcon}</CardTitleIcon>
      <CardTitleText onClick={() => window.open(redirectURL)}>
        {title}
      </CardTitleText>
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
