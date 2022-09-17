import { Conference } from "../../../../types/conference/conference.type";
import { ConferencesItemContainer, ConferencesItemImg } from "./style";

interface Props {
  data: Conference;
}

const ConferencesItem = ({ data }: Props) => {
  return (
    <ConferencesItemContainer onClick={() => window.open(data.event_link)}>
      <ConferencesItemImg src={data.cover_image_link} />
    </ConferencesItemContainer>
  );
};

export default ConferencesItem;
