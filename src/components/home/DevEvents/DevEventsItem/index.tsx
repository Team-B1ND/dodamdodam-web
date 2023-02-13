import dateTransform from "../../../../util/transform/dateTransform";
import * as S from "./style";
import NoImageImage from "../../../../assets/images/common/noImage.svg";
import dataTransform from "../../../../util/transform/dataTransform";
import { DevEvent } from "types/devEvent/devEvent.type";
import { usePostModuleLogMutation } from "../../../../queries/log/log.query";

interface Props {
  data: DevEvent;
}

const DevEventsItem = ({ data }: Props) => {
  const postModuleLogMutation = usePostModuleLogMutation();

  const DevEventData = dataTransform.devEventTypeTransform(data.eventType);

  const redirect = () => {
    postModuleLogMutation.mutate({
      moduleName: "메인/개발자행사",
      description: `${data.title}행사 조회`,
    });
    window.open(data.link);
  };

  return (
    <S.DevEventsItemContainer onClick={redirect}>
      <S.DevEventsItemImgWrap>
        <S.DevEventsItemImg src={DevEventData.image || NoImageImage} />
        <S.DevEventsItemDate>
          {`${dateTransform.period(data.startDate)}`}
          {dateTransform.period(data.startDate) ===
          dateTransform.period(data.endDate)
            ? null
            : `~${dateTransform.period(data.endDate)}`}
        </S.DevEventsItemDate>
      </S.DevEventsItemImgWrap>
      <S.DevEventsItemContentWrap>
        <S.DevEventsItemTitle>{data.title}</S.DevEventsItemTitle>
        <S.DevEventsItemOrganization>
          {data.organization}
        </S.DevEventsItemOrganization>
        <S.DevEventsItemLabel borderColor={DevEventData.color}>
          {DevEventData.name}
        </S.DevEventsItemLabel>
      </S.DevEventsItemContentWrap>
    </S.DevEventsItemContainer>
  );
};

export default DevEventsItem;
