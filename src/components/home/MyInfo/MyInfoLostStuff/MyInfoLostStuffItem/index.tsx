import { LostStuff } from "@src/types/lostStuff/lostStuff.type";
import dataTransform from "@src/util/transform/dataTransform";
import dateTransform from "@src/util/transform/dateTransform";
import * as S from "./style";

interface Props {
  lostStuff: LostStuff;
}

const MyInfoLostStuffItem = ({ lostStuff }: Props) => {
  return (
    <S.MyInfoLostStuffItemContainer>
      <S.MyInfoLostStuffItemImg
        src={lostStuff.image}
        alt="myInfoLostStuffItem/myInfoLostStuffItemImg"
      />
      <S.MyInfoLostStuffItemInfoWrap>
        <S.MyInfoLostStuffItemTitle>
          {lostStuff.title}
        </S.MyInfoLostStuffItemTitle>
        <S.MyInfoLostStuffItemSubInfoWrap>
          <S.MyInfoLostStuffItemSubTitle>
            {dateTransform.fullDate(lostStuff.createAt)}
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
