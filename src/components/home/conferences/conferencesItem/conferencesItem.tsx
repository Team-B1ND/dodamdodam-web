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
} from "./style";
import { CONFERENCES_TAG_ITEMS } from "../../../../constants/conferences/conferences.constant";
import ConferencesTagItem from "./conferencesTagItem/conferencesTagItem";
import NoImageImage from "../../../../assets/images/common/noImage.svg";

interface Props {
  data: Conference;
}

const ConferencesItem = ({ data }: Props) => {
  return (
    <ConferencesItemContainer onClick={() => window.open(data.event_link)}>
      <ConferencesItemImgWrap>
        <ConferencesItemImg src={data.cover_image_link || NoImageImage} />
        <ConferencesItemDate>
          {`${dateTransform.period(data.start_date_time)}(${
            data.start_day_week
          })${
            dateTransform.period(data.start_date_time) !==
            dateTransform.period(data.end_date_time)
              ? `~${dateTransform.period(data.end_date_time)}(${
                  data.end_day_week
                })`
              : ""
          }`}
        </ConferencesItemDate>
      </ConferencesItemImgWrap>
      <ConferencesItemContentWrap>
        <ConferencesItemTitle>{data.title}</ConferencesItemTitle>
        <ConferencesTagWrap>
          {data.tags.map((item) => {
            const tag = CONFERENCES_TAG_ITEMS.find(
              (tag) => tag.id === item.id
            )!;

            return <ConferencesTagItem data={tag} key={tag.id} />;
          })}
        </ConferencesTagWrap>
      </ConferencesItemContentWrap>
    </ConferencesItemContainer>
  );
};

export default ConferencesItem;
