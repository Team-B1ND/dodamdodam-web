import { ConferenceTag } from "types/conference/conference.type";
import { ConferencesTagItemContainer } from "./style";

interface Props {
  data: ConferenceTag;
}

const ConferencesTagItem = ({ data }: Props) => {
  return (
    <ConferencesTagItemContainer backgroundColor={""}>
      {data.title}
    </ConferencesTagItemContainer>
  );
};

export default ConferencesTagItem;
