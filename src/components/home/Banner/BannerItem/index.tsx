import styled from "styled-components";

interface Props {
  title: string;
  imgSrc: string;
  redirectURL: string;
}

const BannerItem = ({ imgSrc, redirectURL, title }: Props) => {
  const redirect = () => {
    window.open(redirectURL);
  };

  return (
    <BannerItemContainer
      src={imgSrc}
      alt={`bannerItem/${title} banner`}
      onClick={redirect}
    />
  );
};

export default BannerItem;

const BannerItemContainer = styled.img`
  width: 798px;
  height: 108px;
  object-fit: cover;
  cursor: pointer;
`;
