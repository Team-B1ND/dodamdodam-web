import { useQuery } from "react-query";
import lostStuffRepository from "../../repository/lostStuff/lostStuff.repository";

const useMyInfoLostStuff = () => {
  const { data, isLoading } = useQuery("losgStuff/getMyLostStuff", () =>
    lostStuffRepository.getMyLostStuffs()
  );

  return {
    notFoundLostStuff: data?.data.result,
    isLoading,
  };
};

export default useMyInfoLostStuff;
