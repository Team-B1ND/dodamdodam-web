import { useGetConferences } from "../../../querys/conference/conference.query";
import ConferencesItem from "./conferencesItem/conferencesItem";
import { ConferenceContainer } from "./style";

const Conferences = () => {
  const { data, isLoading } = useGetConferences();

  return (
    <ConferenceContainer>
      {!isLoading &&
        data?.[0].dev_event
          .map((conference) => (
            <ConferencesItem data={conference} key={conference.id} />
          ))
          .slice(0, 5)}
    </ConferenceContainer>
  );
};

export default Conferences;
