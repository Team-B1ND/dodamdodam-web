import { LostStuff } from "../../../../../types/lostStuff/lostStuff.type";
import dataTransform from "../../../../../util/data/transform/dataTransform";
import dateTransform from "../../../../../util/date/dateTransform";
import * as S from "./style";

interface Props {
  lostStuff: LostStuff;
}

const MyInfoLostStuffItem = ({ lostStuff }: Props) => {
  return (
    <S.MyInfoLostStuffItemContainer>
      <S.MyInfoLostStuffItemImg
        src={lostStuff.picture[0].thumbnail}
        alt="myInfoLostStuffItem/myInfoLostStuffItemImg"
      />
      <S.MyInfoLostStuffItemInfoWrap>
        <S.MyInfoLostStuffItemTitle>
          {lostStuff.title}
        </S.MyInfoLostStuffItemTitle>
        <S.MyInfoLostStuffItemSubInfoWrap>
          <S.MyInfoLostStuffItemSubTitle>
            {dateTransform.fullDate(lostStuff.uploadTime)}
          </S.MyInfoLostStuffItemSubTitle>
          <S.MyInfoLostStuffItemSubTitle>
            {dataTransform.lostStuffTypeTransform(lostStuff.type)}
          </S.MyInfoLostStuffItemSubTitle>
        </S.MyInfoLostStuffItemSubInfoWrap>
      </S.MyInfoLostStuffItemInfoWrap>
    </S.MyInfoLostStuffItemContainer>
  );
};

export default MyInfoLostStuffItem;
