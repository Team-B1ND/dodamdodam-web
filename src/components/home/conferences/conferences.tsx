import ConferencesItem from "./conferencesItem/conferencesItem";
import { ConferenceContainer } from "./style";
import useConferences from "../../../hooks/conferences/useConferences";

const Conferences = () => {
  const { conferences } = useConferences();

  return (
    <ConferenceContainer>
      {conferences.map((conference) => (
        <ConferencesItem data={conference} key={conference.id} />
      ))}
    </ConferenceContainer>
  );
};

export default Conferences;
