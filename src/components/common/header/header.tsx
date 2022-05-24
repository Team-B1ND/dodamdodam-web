import {
  HeaderContainer,
  HeaderWrap,
  HeaderLogo,
  HeaderRelease,
  HeaderReleaseIcon,
  HeaderItemWrap,
  HeaderItem,
} from "./style";
import logo from "../../../assets/logo/dodam_text_logo.svg";
import { AiFillInfoCircle } from "react-icons/ai";
import { HEADER_LINKS } from "../../../constants/header/header.constant";

const Header = () => {
  const currentSelect = "홈";

  return (
    <HeaderContainer>
      <HeaderWrap>
        <HeaderLogo>
          <img src={logo} alt={"header/headerLogo"} />
        </HeaderLogo>
        <HeaderItemWrap>
          {HEADER_LINKS.map((link) => (
            <HeaderItem
              isSelect={link.name === currentSelect}
              key={`header/${link.name}Item`}
            >
              <span onClick={() => window.open(link.link)}>{link.name}</span>
            </HeaderItem>
          ))}
        </HeaderItemWrap>
        <HeaderRelease>
          <HeaderReleaseIcon>
            <AiFillInfoCircle />
          </HeaderReleaseIcon>
        </HeaderRelease>
      </HeaderWrap>
    </HeaderContainer>
  );
};

export default Header;
