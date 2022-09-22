import ConferencesItem from "./devEventsItem/devEventsItem";
import { DevEventsContainer } from "./style";
import useConferences from "../../../hooks/conferences/useConferences";

const DevEvents = () => {
  const { devEvents } = useConferences();

  return (
    <DevEventsContainer>
      {devEvents.map((devEvent) => (
        <ConferencesItem data={devEvent} key={devEvent.id} />
      ))}
    </DevEventsContainer>
  );
};

export default DevEvents;
