import {
  ConferenceBannerContainer,
  ConferenceBannerImg,
  ConferenceBannerImgWrap,
  ConferenceBannerText,
} from "./style";
import ConferenceBannerLaptopIcon from "../../../assets/icons/common/conferenceBannerLaptop.png";
import ConferenceBannerMouseIcon from "../../../assets/icons/common/conferenceBannerMouse.png";
import ConferenceBannerHeadPhoneIcon from "../../../assets/icons/common/conferenceBannerHeadPhone.png";
import ConferenceBannerComputerIcon from "../../../assets/icons/common/conferenceBannerComputer.png";

const ConferenceBanner = () => {
  return (
    <ConferenceBannerContainer>
      <ConferenceBannerText>
        이달에 열리는 개발자 행사를 알아보세요!
      </ConferenceBannerText>
      <ConferenceBannerImgWrap style={{ right: 205 }}>
        <ConferenceBannerImg src={ConferenceBannerLaptopIcon} />
        <ConferenceBannerImg src={ConferenceBannerMouseIcon} />
      </ConferenceBannerImgWrap>
      <ConferenceBannerImgWrap style={{ right: 85 }}>
        <ConferenceBannerImg src={ConferenceBannerHeadPhoneIcon} />
        <ConferenceBannerImg src={ConferenceBannerComputerIcon} />
      </ConferenceBannerImgWrap>
    </ConferenceBannerContainer>
  );
};

export default ConferenceBanner;
