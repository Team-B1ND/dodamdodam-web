import ConferencesItem from "./devEventsItem/devEventsItem";
import { DevEventsContainer } from "./style";
import useDevEvent from "../../../hooks/devEvent/useDevEvent";

const DevEvents = () => {
  const { devEvents } = useDevEvent();

  return (
    <DevEventsContainer>
      {devEvents.map((devEvent, idx) => (
        <ConferencesItem data={devEvent} key={idx} />
      ))}
    </DevEventsContainer>
  );
};

export default DevEvents;
