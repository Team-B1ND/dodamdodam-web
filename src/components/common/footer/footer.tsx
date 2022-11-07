import * as S from "./style";
import DodamDodamTeamLogo from "../../../assets/logo/bind_team_logo.svg";
import {
  FOOTER_ITEMS,
  FOOTER_MOBILE_ITEMS,
  FOOTER_SOCIAL_ITEMS,
} from "../../../constants/footer/footer.constant";

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterWrap>
        <S.FooterLeftWrap>
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
          <S.FooterListWrap>
            {FOOTER_ITEMS.map((list) => (
              <S.FooterList key={`footerList ${list.title}`}>
                <S.FooterListTitleItem>{list.title}</S.FooterListTitleItem>
                {list.items.map((item) => (
                  <S.FooterListItem
                    onClick={() => (window.location.href = item.link)}
                    key={`footerListItem ${item.title}`}
                  >
                    {item.title}
                  </S.FooterListItem>
                ))}
              </S.FooterList>
            ))}
          </S.FooterListWrap>
          <S.FooterTextWrap>
            <S.FooterVersion>v 6.0.0</S.FooterVersion>

            <S.FooterCopyrightText>
              Copyright By B1ND team. All rights reserved. Since 2017
            </S.FooterCopyrightText>
          </S.FooterTextWrap>
        </S.FooterLeftWrap>
        <S.FooterRightWrap>
          <S.FooterSocialWrap>
            {FOOTER_SOCIAL_ITEMS.map((item) => (
              <S.FooterSocialItem key={`footerSocialItem ${item.title}`}>
                <S.FooterSocialItemIcon onClick={() => window.open(item.link)}>
                  <item.icon />
                </S.FooterSocialItemIcon>
              </S.FooterSocialItem>
            ))}
          </S.FooterSocialWrap>
          <S.FooterMobileWrap>
            <S.FooterMobileTitle>Dodam Dodam Mobile</S.FooterMobileTitle>
            {FOOTER_MOBILE_ITEMS.map((item) => (
              <S.FooterMobileItemWrap
                onClick={() => window.open(item.link)}
                key={`footerMobileItem ${item.title}`}
              >
                <S.FooterMobileItemLogo>
                  <item.icon />
                </S.FooterMobileItemLogo>
                <S.FooterMobileItemText>{item.title}</S.FooterMobileItemText>
              </S.FooterMobileItemWrap>
            ))}
          </S.FooterMobileWrap>
        </S.FooterRightWrap>
      </S.FooterWrap>
    </S.FooterContainer>
  );
};

export default Footer;
