import { useEffect, useState } from "react";
import { useGetMyLostStuff } from "../../querys/lostStuff/lostStuff.query";
import { LostStuff } from "../../types/lostStuff/lostStuff.type";

const useMyInfoLostStuff = () => {
  const { data: myLostStuffs, isLoading } = useGetMyLostStuff({
    staleTime: 10000,
    cacheTime: 1000 * 60 * 10,
  });

  const [notFoundLostStuffs, setNotFoundLostStuffs] = useState<LostStuff[]>([]);

  useEffect(() => {
    if (myLostStuffs) {
      setNotFoundLostStuffs(myLostStuffs.data.result);
    }
  }, [myLostStuffs]);

  return {
    notFoundLostStuffs,
    isLoading,
  };
};

export default useMyInfoLostStuff;
