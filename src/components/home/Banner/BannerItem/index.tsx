import { usePostModuleLogMutation } from "@src/queries/log/log.query";
import { BannerItemContainer } from "./style";

interface Props {
  title: string;
  imgSrc: string;
  redirectURL: string;
}

const BannerItem = ({ imgSrc, redirectURL, title }: Props) => {
  const postModuleLogMutation = usePostModuleLogMutation();

  const redirect = () => {
    postModuleLogMutation.mutate({
      moduleName: "메인/배너",
      description: `메인페이지에서 ${title}배너 클릭`,
    });
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
