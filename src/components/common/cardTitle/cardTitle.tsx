import {
  CardTitleContainer,
  CardTitleIcon,
  CardTitleRedirectIcon,
  CardTitleRedirectWrap,
  CardTitleText,
} from "./style";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";

import { ReactNode } from "react";
import { usePostModuleLog } from "../../../queries/log/log.query";

type Props = {
  title: string;
  titleIcon: string;
  redirectURL: string;
  children?: ReactNode;
};

const CardTitle = ({ title, titleIcon, redirectURL, children }: Props) => {
  const postModuleLogMutation = usePostModuleLog();

  const redirect = () => {
    postModuleLogMutation.mutate({
      moduleName: "메인",
      description: `더보기를 통해 ${redirectURL}로 이동`,
    });
    window.location.href = redirectURL;
  };

  return (
    <CardTitleContainer>
      <CardTitleIcon src={titleIcon} />
      <CardTitleText onClick={redirect}>{title}</CardTitleText>
      {children}
      <CardTitleRedirectWrap onClick={redirect}>
        더보기
        <CardTitleRedirectIcon>
          <FiChevronRight />
        </CardTitleRedirectIcon>
      </CardTitleRedirectWrap>
    </CardTitleContainer>
  );
};

export default CardTitle;
