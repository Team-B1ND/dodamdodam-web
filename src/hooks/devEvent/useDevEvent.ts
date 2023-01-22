import { useGetDevEvents } from "../../queries/devEvent/devEvent.query";
import { useEffect, useState } from "react";
import { DevEvent } from "../../types/devEvent/devEvent.type";

const useDevEvent = () => {
  const [devEvents, setDevEvents] = useState<DevEvent[]>([]);

  const { data, isLoading } = useGetDevEvents();

  useEffect(() => {
    if (data && !isLoading) {
      setDevEvents(data.data.slice(0, 10));
    }
  }, [data, isLoading]);

  return { devEvents };
};

export default useDevEvent;
