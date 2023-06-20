import * as S from "./style";
import { FcDocument } from "react-icons/fc";
import { Column, Row } from "../style";
import BannerList from "./BannerList";
import BannerPost from "./BannerPost";
import BannerHandler from "./BannerHandler";
const BannerSetting = () => {
  return (
    <>
      <S.BannerTopWrap>
        <FcDocument size={29} />
        <S.BannerTitle>배너 관리</S.BannerTitle>
      </S.BannerTopWrap>
      <Row>
        <BannerList />
        <Column>
          <BannerPost />
          <BannerHandler />
        </Column>
      </Row>
    </>
  );
};

export default BannerSetting;
