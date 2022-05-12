import { HeaderContainer, HeaderWrap, HeaderLogo } from "./style";
import Logo from "../../../assets/logo/dodam_text_logo.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrap>
        <HeaderLogo src={Logo} alt={"header/headerLogo"} />
      </HeaderWrap>
    </HeaderContainer>
  );
};

export default Header;
