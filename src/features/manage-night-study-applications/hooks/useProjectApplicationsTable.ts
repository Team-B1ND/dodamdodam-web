import {
  useAllowApplicationMutation,
  usePendingApplicationMutation,
  useRejectApplicationMutation,
} from "@/entities/night-study/mutations";
import { useGetProjectApplicationsQuery } from "@/entities/night-study/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useProjectApplicationsTable = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProjectApplicationsQuery();

  const filtered = data.pages.flatMap((p) => p.data.content);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { mutate: allow, isPending: isAllowing } = useAllowApplicationMutation();
  const { mutate: reject, isPending: isRejecting } = useRejectApplicationMutation();
  const { mutate: pending, isPending: isPendingRevert } = usePendingApplicationMutation();

  return {
    filtered,
    ref,
    isFetchingNextPage,
    allow,
    isAllowing,
    reject,
    isRejecting,
    pending,
    isPendingRevert,
  };
};
