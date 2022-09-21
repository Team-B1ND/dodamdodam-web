import dateTransform from "../../../../util/transform/dateTransform";
import { Conference } from "../../../../types/conference/conference.type";
import {
  ConferencesItemTitle,
  ConferencesItemContainer,
  ConferencesItemContentWrap,
  ConferencesItemDate,
  ConferencesItemImg,
  ConferencesItemImgWrap,
  ConferencesTagWrap,
  ConferencesItemLabel,
  ConferencesTagItem,
} from "./style";
// import { CONFERENCES_TAG_ITEMS } from "../../../../constants/conferences/conferences.constant";
import NoImageImage from "../../../../assets/images/common/noImage.svg";
import dataTransform from "../../../../util/transform/dataTransform";

interface Props {
  data: Conference;
}

const ConferencesItem = ({ data }: Props) => {
  return (
    <ConferencesItemContainer
      onClick={() =>
        window.open(`https://www.wanted.co.kr/events/${data.metadata.key}`)
      }
    >
      <ConferencesItemImgWrap>
        <ConferencesItemImg src={data.images.thumbnail_img || NoImageImage} />
        <ConferencesItemDate>
          {`${dateTransform.period(data.metadata.start_time)}`}
          {`${
            data.metadata.end_time
              ? `~${dateTransform.period(data.metadata.end_time)}`
              : ""
          }`}
        </ConferencesItemDate>
      </ConferencesItemImgWrap>
      <ConferencesItemContentWrap>
        <ConferencesItemTitle>{data.metadata.title}</ConferencesItemTitle>
        <ConferencesItemLabel
          borderColor={
            dataTransform.conferenceLabelTransform(data.metadata.label)?.color!
          }
        >
          {dataTransform.conferenceLabelTransform(data.metadata.label)?.name}
        </ConferencesItemLabel>
        <ConferencesTagWrap>
          {data.categories.map((item) => {
            return (
              <ConferencesTagItem key={item.id}>
                #{item.title}
              </ConferencesTagItem>
            );
          })}
        </ConferencesTagWrap>
      </ConferencesItemContentWrap>
    </ConferencesItemContainer>
  );
};

export default ConferencesItem;
