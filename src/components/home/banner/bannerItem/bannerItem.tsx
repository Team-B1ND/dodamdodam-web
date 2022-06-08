import { BannerItemContainer } from "./style";

interface Props {
  title: string;
  imgSrc: string;
  redirectURL: string;
}

const BannerItem = ({ imgSrc, redirectURL, title }: Props) => {
  return (
    <BannerItemContainer
      src={imgSrc}
      alt={`bannerItem/${title} banner`}
      onClick={() => window.open(redirectURL)}
    />
  );
};

export default BannerItem;
