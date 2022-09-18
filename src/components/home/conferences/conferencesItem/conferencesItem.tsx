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

interface Props {
  data: Conference;
}

const ConferencesItem = ({ data }: Props) => {
  return (
    <ConferencesItemContainer onClick={() => window.open(data.event_link)}>
      <ConferencesItemImgWrap>
        <ConferencesItemImg
          src={
            data.cover_image_link ||
            "data:image/png;base64,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"
          }
        />
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
