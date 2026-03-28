import type { ApplicationTableFilters } from "@/entities/night-study/types";
import {
  useAllowApplicationMutation,
  usePendingApplicationMutation,
  useRejectApplicationMutation,
} from "@/entities/night-study/mutations";
import { useGetPersonalApplicationsQuery } from "@/entities/night-study/queries";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const usePersonalApplicationsTable = (filters: ApplicationTableFilters = {}) => {
  const { keyword, status, grade, room } = filters;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPersonalApplicationsQuery({ keyword, status });

  const all = data.pages.flatMap((p) => p.data.content);

  const filtered = all.filter((app) => {
    const student = app.leader.student;
    if (grade !== undefined && student?.grade !== grade) return false;
    if (room !== undefined && student?.room !== room) return false;
    return true;
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const toggleAll = (ids: string[]) => {
    if (selectedIds.size === ids.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(ids));
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const { mutate: allow, isPending: isAllowing } = useAllowApplicationMutation();
  const { mutate: reject, isPending: isRejecting } = useRejectApplicationMutation();
  const { mutate: pending, isPending: isPendingRevert } = usePendingApplicationMutation();

  const handleBulkAllow = (ids: string[]) => {
    ids.forEach((id) => allow(id));
    setSelectedIds(new Set());
  };

  const handleBulkReject = (reason: string, ids: string[], onSettled?: () => void) => {
    let settledCount = 0;
    ids.forEach((id) => {
      reject(
        { id, rejectionReason: reason },
        {
          onSettled: () => {
            settledCount++;
            if (settledCount === ids.length) onSettled?.();
          },
        },
      );
    });
    setSelectedIds(new Set());
  };

  return {
    filtered,
    selectedIds,
    toggleAll,
    toggleOne,
    ref,
    isFetchingNextPage,
    allow,
    isAllowing,
    reject,
    isRejecting,
    pending,
    isPendingRevert,
    handleBulkAllow,
    handleBulkReject,
  };
};
