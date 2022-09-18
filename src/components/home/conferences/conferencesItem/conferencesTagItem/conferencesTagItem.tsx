import { ConferenceTag } from "types/conference/conference.type";
import { ConferencesTagItemContainer } from "./style";

interface Props {
  data: ConferenceTag;
}

const ConferencesTagItem = ({ data }: Props) => {
  return (
    <ConferencesTagItemContainer backgroundColor={data.tag_color}>
      {data.tag_name}
    </ConferencesTagItemContainer>
  );
};

export default ConferencesTagItem;
