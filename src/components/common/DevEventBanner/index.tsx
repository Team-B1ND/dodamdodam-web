import * as S from "./style";
import DevEventBannerLaptopIcon from "../../../assets/icons/common/devEventBannerLaptop.png";
import DevEventBannerMouseIcon from "../../../assets/icons/common/devEventBannerMouse.png";
import DevEventBannerHeadPhoneIcon from "../../../assets/icons/common/devEventBannerHeadPhone.png";
import DevEventBannerComputerIcon from "../../../assets/icons/common/devEventBannerComputer.png";

const DevEventBanner = () => {
  return (
    <S.DevEventBannerContainer>
      <S.DevEventBannerText>
        이달에 열리는 개발자 행사를 알아보세요!
      </S.DevEventBannerText>
      <S.DevEventBannerImgWrap style={{ right: 205 }}>
        <S.DevEventBannerImg src={DevEventBannerLaptopIcon} />
        <S.DevEventBannerImg src={DevEventBannerMouseIcon} />
      </S.DevEventBannerImgWrap>
      <S.DevEventBannerImgWrap style={{ right: 85 }}>
        <S.DevEventBannerImg src={DevEventBannerHeadPhoneIcon} />
        <S.DevEventBannerImg src={DevEventBannerComputerIcon} />
      </S.DevEventBannerImgWrap>
    </S.DevEventBannerContainer>
  );
};

export default DevEventBanner;
