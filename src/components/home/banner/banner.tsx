import { useEffect, useMemo } from "react";
import useBanner from "../../../hooks/banner/useBanner";
import { BannerContainer } from "./style";
import Slider from "react-slick";
import BannerItem from "./bannerItem/bannerItem";

const Banner = () => {
  const { approveBanners } = useBanner();

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
            redirectURL={banner.url}
          />
        ))}
      </Slider>
    </BannerContainer>
  );
};

export default Banner;
