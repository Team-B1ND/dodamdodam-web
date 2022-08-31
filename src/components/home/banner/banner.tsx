import { useMemo } from "react";
import useBanner from "../../../hooks/banner/useBanner";
import { BannerContainer, BannerManageButton } from "./style";
import Slider from "react-slick";
import BannerItem from "./bannerItem/bannerItem";
import { IoOptionsOutline } from "@react-icons/all-files/io5/IoOptionsOutline";

const Banner = () => {
  const { approveBanners, isBannerAuthority } = useBanner();

  const bannerSetting = useMemo(
    () => ({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      appendDots: (dots: any) => (
        <div
          style={{
            position: "relative",
            top: "-2rem",
          }}
        >
          {dots}
        </div>
      ),
    }),
    []
  );

  return (
    <BannerContainer>
      <Slider {...bannerSetting}>
        {approveBanners.map((banner) => (
          <BannerItem
            title={banner.title}
            imgSrc={banner.image}
            redirectURL={banner.redirectUrl}
            key={banner.id}
          />
        ))}
      </Slider>
      {isBannerAuthority && (
        <BannerManageButton
          onClick={() =>
            window.open("http://dodam.b1nd.com/bannersetting", "_blank")
          }
        >
          <IoOptionsOutline />
        </BannerManageButton>
      )}
    </BannerContainer>
  );
};

export default Banner;
