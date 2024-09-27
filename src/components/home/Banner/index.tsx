import { useMemo } from "react";
import useBanner from "@src/hooks/banner/useBanner";
import * as S from "./style";
import Slider from "react-slick";
import BannerItem from "./BannerItem";

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
    <S.BannerContainer>
      <Slider {...bannerSetting}>
        {approveBanners.map((banner) => (
          <BannerItem
            title={banner.title}
            imgSrc={banner.imageUrl}
            redirectURL={banner.redirectUrl}
            key={banner.id}
          />
        ))}
      </Slider>
    </S.BannerContainer>
  );
};

export default Banner;
