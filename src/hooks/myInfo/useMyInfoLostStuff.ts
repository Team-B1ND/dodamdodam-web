import { useGetMyLostStuff } from "../../querys/lostStuff/lostStuff.query";

const useMyInfoLostStuff = () => {
  const { data, isLoading } = useGetMyLostStuff({
    staleTime: 10000,
    cacheTime: 1000 * 60 * 10,
  });

  return {
    notFoundLostStuff: data?.data.result,
    isLoading,
  };
};

export default useMyInfoLostStuff;
