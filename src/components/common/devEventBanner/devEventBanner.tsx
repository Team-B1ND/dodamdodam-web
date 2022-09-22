import {
  DevEventBannerContainer,
  DevEventBannerImg,
  DevEventBannerImgWrap,
  DevEventBannerText,
} from "./style";
import DevEventBannerLaptopIcon from "../../../assets/icons/common/devEventBannerLaptop.png";
import DevEventBannerMouseIcon from "../../../assets/icons/common/devEventBannerMouse.png";
import DevEventBannerHeadPhoneIcon from "../../../assets/icons/common/devEventBannerHeadPhone.png";
import DevEventBannerComputerIcon from "../../../assets/icons/common/devEventBannerComputer.png";

const DevEventBanner = () => {
  return (
    <DevEventBannerContainer>
      <DevEventBannerText>
        이달에 열리는 개발자 행사를 알아보세요!
      </DevEventBannerText>
      <DevEventBannerImgWrap style={{ right: 205 }}>
        <DevEventBannerImg src={DevEventBannerLaptopIcon} />
        <DevEventBannerImg src={DevEventBannerMouseIcon} />
      </DevEventBannerImgWrap>
      <DevEventBannerImgWrap style={{ right: 85 }}>
        <DevEventBannerImg src={DevEventBannerHeadPhoneIcon} />
        <DevEventBannerImg src={DevEventBannerComputerIcon} />
      </DevEventBannerImgWrap>
    </DevEventBannerContainer>
  );
};

export default DevEventBanner;
