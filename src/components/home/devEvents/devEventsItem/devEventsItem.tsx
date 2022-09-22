import dateTransform from "../../../../util/transform/dateTransform";
import {
  DevEventsItemTitle,
  DevEventsItemContainer,
  DevEventsItemContentWrap,
  DevEventsItemDate,
  DevEventsItemImg,
  DevEventsItemImgWrap,
  DevEventsTagWrap,
  DevEventsItemLabel,
  DevEventsTagItem,
} from "./style";
import NoImageImage from "../../../../assets/images/common/noImage.svg";
import dataTransform from "../../../../util/transform/dataTransform";
import { DevEvent } from "types/devEvent/devEvent.type";

interface Props {
  data: DevEvent;
}

const DevEventsItem = ({ data }: Props) => {
  return (
    <DevEventsItemContainer
      onClick={() =>
        window.open(`https://www.wanted.co.kr/events/${data.metadata.key}`)
      }
    >
      <DevEventsItemImgWrap>
        <DevEventsItemImg src={data.images.thumbnail_img || NoImageImage} />
        <DevEventsItemDate>
          {`${dateTransform.period(data.metadata.start_time)}`}
          {`${
            data.metadata.end_time
              ? `~${dateTransform.period(data.metadata.end_time)}`
              : ""
          }`}
        </DevEventsItemDate>
      </DevEventsItemImgWrap>
      <DevEventsItemContentWrap>
        <DevEventsItemTitle>{data.metadata.title}</DevEventsItemTitle>
        <DevEventsItemLabel
          borderColor={
            dataTransform.devEventLabelTransform(data.metadata.label)?.color!
          }
        >
          {dataTransform.devEventLabelTransform(data.metadata.label)?.name}
        </DevEventsItemLabel>
        <DevEventsTagWrap>
          {data.categories.map((item) => {
            return (
              <DevEventsTagItem key={item.id}>#{item.title}</DevEventsTagItem>
            );
          })}
        </DevEventsTagWrap>
      </DevEventsItemContentWrap>
    </DevEventsItemContainer>
  );
};

export default DevEventsItem;
