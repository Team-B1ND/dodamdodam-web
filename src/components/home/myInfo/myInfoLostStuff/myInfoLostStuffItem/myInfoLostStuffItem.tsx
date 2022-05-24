import { LostStuff } from "../../../../../types/lostStuff/lostStuff.type";
import dataTransform from "../../../../../util/data/transform/dataTransform";
import dateTransform from "../../../../../util/date/dateTransform";
import {
  MyInfoLostStuffItemContainer,
  MyInfoLostStuffItemImg,
  MyInfoLostStuffItemInfoWrap,
  MyInfoLostStuffItemSubInfoWrap,
  MyInfoLostStuffItemSubTitle,
  MyInfoLostStuffItemTitle,
} from "./style";

interface Props {
  lostStuff: LostStuff;
}

const MyInfoLostStuffItem = ({ lostStuff }: Props) => {
  return (
    <MyInfoLostStuffItemContainer>
      <MyInfoLostStuffItemImg
        src={lostStuff.picture[0].thumbnail}
        alt="myInfoLostStuffItem/myInfoLostStuffItemImg"
      />
      <MyInfoLostStuffItemInfoWrap>
        <MyInfoLostStuffItemTitle>{lostStuff.title}</MyInfoLostStuffItemTitle>
        <MyInfoLostStuffItemSubInfoWrap>
          <MyInfoLostStuffItemSubTitle>
            {dateTransform.fullDate(lostStuff.uploadTime)}
          </MyInfoLostStuffItemSubTitle>
          <MyInfoLostStuffItemSubTitle>
            {dataTransform.lostStuffTypeTransform(lostStuff.type)}
          </MyInfoLostStuffItemSubTitle>
        </MyInfoLostStuffItemSubInfoWrap>
      </MyInfoLostStuffItemInfoWrap>
    </MyInfoLostStuffItemContainer>
  );
};

export default MyInfoLostStuffItem;
