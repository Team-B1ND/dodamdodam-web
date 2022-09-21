import dayjs from "dayjs";
import { useGetConferences } from "../../querys/conference/conference.query";
import { useEffect, useState } from "react";
import { Conference } from "../../types/conference/conference.type";
import dateTransform from "../../util/transform/dateTransform";

const useConferences = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);

  const { data, isLoading } = useGetConferences();

  console.log(data);

  useEffect(() => {
    if (data && !isLoading) {
      setConferences(data.data.slice(0, 10));
    }
  }, [data, isLoading]);

  return { conferences };
};

export default useConferences;
