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
  DevEventsItemOrganization,
} from "./style";
import NoImageImage from "../../../../assets/images/common/noImage.svg";
import dataTransform from "../../../../util/transform/dataTransform";
import { DevEvent } from "types/devEvent/devEvent.type";
import { usePostModuleLog } from "../../../../querys/log/log.query";

interface Props {
  data: DevEvent;
}

const DevEventsItem = ({ data }: Props) => {
  const postModuleLogMutation = usePostModuleLog();

  const DevEventData = dataTransform.devEventTypeTransform(data.eventType);

  const redirect = () => {
    postModuleLogMutation.mutate({
      moduleName: "메인/개발자행사",
      description: `${data.title}행사 조회`,
    });
    window.open(data.link);
  };

  return (
    <DevEventsItemContainer onClick={redirect}>
      <DevEventsItemImgWrap>
        <DevEventsItemImg src={DevEventData.image || NoImageImage} />
        <DevEventsItemDate>
          {`${dateTransform.period(data.startDate)}`}
          {dateTransform.period(data.startDate) ===
          dateTransform.period(data.endDate)
            ? null
            : `~${dateTransform.period(data.endDate)}`}
        </DevEventsItemDate>
      </DevEventsItemImgWrap>
      <DevEventsItemContentWrap>
        <DevEventsItemTitle>{data.title}</DevEventsItemTitle>
        <DevEventsItemOrganization>
          {data.organization}
        </DevEventsItemOrganization>
        <DevEventsItemLabel borderColor={DevEventData.color}>
          {DevEventData.name}
        </DevEventsItemLabel>
      </DevEventsItemContentWrap>
    </DevEventsItemContainer>
  );
};

export default DevEventsItem;
