import type { ApplicationTableFilters } from "@/entities/night-study/types";
import {
  useAllowApplicationMutation,
  usePendingApplicationMutation,
  useRejectApplicationMutation,
} from "@/entities/night-study/mutations";
import { useGetProjectApplicationsQuery } from "@/entities/night-study/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useProjectApplicationsTable = (filters: ApplicationTableFilters = {}) => {
  const { keyword, status, grade, room } = filters;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProjectApplicationsQuery({ keyword, status });

  const all = data.pages.flatMap((p) => p.data.content);

  const filtered = all.filter((app) => {
    const student = app.leader.student;
    if (grade !== undefined && student?.grade !== grade) return false;
    if (room !== undefined && student?.room !== room) return false;
    return true;
  });

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
