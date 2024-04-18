import * as S from "./style";
import logo from "@src/assets/logo/dodam_text_logo.svg";
import { AiFillInfoCircle } from "@react-icons/all-files/ai/AiFillInfoCircle";
import { HEADER_LINKS } from "@src/constants/header/header.constant";

const Header = () => {
  const currentSelect = "홈";

  return (
    <S.HeaderContainer>
      <S.HeaderWrap>
        <S.HeaderLogo>
          <img src={logo} alt={"header/headerLogo"} />
        </S.HeaderLogo>
        <S.HeaderItemWrap>
          {HEADER_LINKS.map((link) => (
            <S.HeaderItem
              isSelect={link.name === currentSelect}
              key={`header/${link.name}Item`}
            >
              <span onClick={() => (window.location.href = link.link)}>
                {link.name}
              </span>
            </S.HeaderItem>
          ))}
        </S.HeaderItemWrap>
        <S.HeaderRelease>
          <S.HeaderReleaseIcon>
            <AiFillInfoCircle />
          </S.HeaderReleaseIcon>
        </S.HeaderRelease>
      </S.HeaderWrap>
    </S.HeaderContainer>
  );
};

export default Header;
