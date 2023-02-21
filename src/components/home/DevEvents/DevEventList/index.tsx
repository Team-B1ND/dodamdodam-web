import { useGetDevEventsQuery } from "@src/queries/devEvent/devEvent.query";
import DevEventsItem from "../DevEventsItem";

const DevEventList = () => {
  const { data: serverDevEventsData } = useGetDevEventsQuery({
    suspense: true,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <>
      {serverDevEventsData?.data.slice(0, 10).map((devEvent, idx) => (
        <DevEventsItem data={devEvent} key={`${devEvent.title} ${idx}`} />
      ))}
    </>
  );
};

export default DevEventList;
