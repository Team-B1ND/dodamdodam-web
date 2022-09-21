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
import { AiFillInfoCircle } from "@react-icons/all-files/ai/AiFillInfoCircle";
import { HEADER_LINKS } from "../../../constants/header/header.constant";
import { event } from "../../../lib/ga/gtag";
import { track } from "@amplitude/analytics-browser";

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
              <span
                onClick={() => {
                  event({
                    action: link.name,
                    category: "기능 접근 수치",
                    label: "",
                    value: 0,
                  });
                  track(link.name + "접속");
                  window.open(link.link);
                }}
              >
                {link.name}
              </span>
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
