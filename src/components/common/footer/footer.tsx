import * as S from "./style";
import DodamDodamTeamLogo from "../../../assets/logo/bind_team_logo.svg";
import {
  FOOTER_ITEMS,
  FOOTER_MOBILE_ITEMS,
} from "../../../constants/footer/footer.constant";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <S.FooterContainer>
      <S.FooterWrap>
        <S.FooterContentWrap>
          <S.FooterTextWrap>
            <S.FooterLogoWrap onClick={() => window.open("http://b1nd.com/#/")}>
              <S.FooterLogo src={DodamDodamTeamLogo} />
              <S.FooterLogoTitle>B1ND</S.FooterLogoTitle>
            </S.FooterLogoWrap>
            <S.FooterDescription>
              도담도담은 현재 대구소프트웨어마이스터고등학교에서 사용 중인
              스마트 학생 생활 관리 시스템입니다.
            </S.FooterDescription>
          </S.FooterTextWrap>
          <S.FooterTextWrap>
            <S.FooterCopyrightText>
              Copyright By B1ND team. All rights reserved. Since 2017
            </S.FooterCopyrightText>
          </S.FooterTextWrap>
          <S.FooterTextWrap>
            <S.FooterVersion>v 6.0.0</S.FooterVersion>
            {FOOTER_ITEMS.map((item) => (
              <S.FooterItem onClick={() => navigate(item.link)}>
                {item.title}
              </S.FooterItem>
            ))}
          </S.FooterTextWrap>
        </S.FooterContentWrap>
        <S.FooterMobileWrap>
          <S.FooterMobileTitle>Dodam Dodam Mobile</S.FooterMobileTitle>
          {FOOTER_MOBILE_ITEMS.map((item) => (
            <S.FooterMobileItemWrap onClick={() => window.open(item.link)}>
              <S.FooterMobileItemLogo>
                <item.icon />
              </S.FooterMobileItemLogo>
              <S.FooterMobileItemText>{item.title}</S.FooterMobileItemText>
            </S.FooterMobileItemWrap>
          ))}
        </S.FooterMobileWrap>
      </S.FooterWrap>
    </S.FooterContainer>
  );
};

export default Footer;
