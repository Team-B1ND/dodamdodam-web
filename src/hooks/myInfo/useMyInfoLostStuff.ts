import { useGetMyLostStuff } from "../../querys/lostStuff/lostStuff.query";

const useMyInfoLostStuff = () => {
  const { data, isLoading } = useGetMyLostStuff();

  return {
    notFoundLostStuff: data?.data.result,
    isLoading,
  };
};

export default useMyInfoLostStuff;
