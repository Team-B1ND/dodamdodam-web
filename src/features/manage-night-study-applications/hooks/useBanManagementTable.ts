import {
  useCreateBanMutation,
  useDeleteBanMutation,
} from "@/entities/night-study/mutations";
import { useGetBanListQuery } from "@/entities/night-study/queries";
import type { BanStatusResponse } from "@/entities/night-study/types";
import { useSearchStudentQuery } from "@/entities/user/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useBanManagementTable = (keyword: string) => {
  const { data: searchData, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchStudentQuery(keyword.trim());
  const { data: banData } = useGetBanListQuery();

  const students = searchData.pages.flatMap((p) => p.data.content);
  const banMap = new Map<string, BanStatusResponse>(
    banData.data.map((ban) => [ban.userId, ban]),
  );

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { mutate: createBan, isPending: isCreating } = useCreateBanMutation();
  const { mutate: deleteBan, isPending: isDeleting } = useDeleteBanMutation();

  return {
    students,
    banMap,
    ref,
    isFetchingNextPage,
    createBan,
    isCreating,
    deleteBan,
    isDeleting,
  };
};
