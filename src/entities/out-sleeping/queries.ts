import { OutSleepingApi } from "@/entities/out-sleeping/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetMyOutSleepingQuery = () => 
  useSuspenseQuery({
    queryKey: ["out-sleeping", "my"],
    queryFn: OutSleepingApi.getMyOutSleeping,
    staleTime: 1000 * 60 * 5
  });