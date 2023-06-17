import * as S from "./style";
import logo from "@src/assets/logo/dodam_text_logo.svg";
import { AiFillInfoCircle } from "@react-icons/all-files/ai/AiFillInfoCircle";
import {
  HEADER_LINKS,
  HEADER_NEW_LINKS,
} from "@src/constants/header/header.constant";
import { pageView } from "@src/lib/ga/gtag";
import { track } from "@amplitude/analytics-browser";
import { usePostModuleLogMutation } from "@src/queries/log/log.query";

const Header = () => {
  const postModuleLogMutation = usePostModuleLogMutation();

  const currentSelect = "홈";

  return (
    <S.HeaderContainer>
      <S.HeaderWrap>
        <S.HeaderLogo>
          <img src={logo} alt={"header/headerLogo"} />
        </S.HeaderLogo>
        <S.HeaderItemWrap>
          {HEADER_LINKS.map((link) => (
            <>
              <S.HeaderItem
                isSelect={link.name === currentSelect}
                key={`header/${link.name}Item`}
              >
                <span
                  onClick={() => {
                    postModuleLogMutation.mutate({
                      description: `메인페이지에서 ${link.name}페이지로 접근`,
                      moduleName: link.name,
                    });
                    pageView(link.name);
                    track(link.name + "접속");
                    window.location.href = link.link;
                  }}
                >
                  {link.name}
                </span>
              </S.HeaderItem>
            </>
          ))}
          {HEADER_NEW_LINKS.map((link) => (
            <>
              <S.HeaderItem
                isSelect={link.name === currentSelect}
                key={`header/${link.name}Item`}
              >
                <span
                  onClick={() => {
                    postModuleLogMutation.mutate({
                      description: `메인페이지에서 ${link.name}페이지로 접근`,
                      moduleName: link.name,
                    });
                    pageView(link.name);
                    track(link.name + "접속");
                    window.location.href = link.link;
                  }}
                >
                  {link.name}
                </span>
                <S.HeaderNewItemIcon>N</S.HeaderNewItemIcon>
              </S.HeaderItem>
            </>
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
