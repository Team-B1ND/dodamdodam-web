import { useQuery } from "react-query";
import lostStuffRepository from "../../repository/lostStuff/lostStuff.repository";

export const useGetMyLostStuff = () =>
  useQuery("lostStuff/getMyLostStuff", () =>
    lostStuffRepository.getMyLostStuffs()
  );
