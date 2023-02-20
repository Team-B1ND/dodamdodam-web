import * as S from "./style";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";

import { ReactNode } from "react";
import { usePostModuleLogMutation } from "@src/queries/log/log.query";

type Props = {
  title: string;
  titleIcon: string;
  redirectURL: string;
  children?: ReactNode;
};

const CardTitle = ({ title, titleIcon, redirectURL, children }: Props) => {
  const postModuleLogMutation = usePostModuleLogMutation();

  const redirect = () => {
    postModuleLogMutation.mutate({
      moduleName: "메인",
      description: `더보기를 통해 ${redirectURL}로 이동`,
    });
    window.location.href = redirectURL;
  };

  return (
    <S.CardTitleContainer>
      <S.CardTitleIcon src={titleIcon} />
      <S.CardTitleText onClick={redirect}>{title}</S.CardTitleText>
      {children}
      <S.CardTitleRedirectWrap onClick={redirect}>
        더보기
        <S.CardTitleRedirectIcon>
          <FiChevronRight />
        </S.CardTitleRedirectIcon>
      </S.CardTitleRedirectWrap>
    </S.CardTitleContainer>
  );
};

export default CardTitle;
