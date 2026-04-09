import { useSearchUserQuery } from "@/entities/user/queries";
import type { UserStatus } from "@/entities/user/types";
import type { UseFilterUserReturn } from "@/features/manage-user/model/useFilterUser";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const USER_STATUS_VALUE_MAP: Record<string, UserStatus | null> = {
  전체: null,
  승인: "ACTIVE",
  "대기 중": "PENDING",
  미승인: "DEACTIVATED",
};

export const useManageUserTable = ({
  keyword,
  roles,
  generationOnly,
  selectedStatus,
}: Pick<
  UseFilterUserReturn,
  "keyword" | "roles" | "generationOnly" | "selectedStatus"
>) => {
  const debouncedKeyword = useDebounce(keyword.trim());
  const targetStatus = USER_STATUS_VALUE_MAP[selectedStatus] ?? null;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchUserQuery({
    keyword: debouncedKeyword,
    roles,
    generationOnly,
    status: targetStatus ? [targetStatus] : [],
  });

  const users = data.pages.flatMap((page) => page.data.content);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    users,
    ref,
    hasNextPage,
    isFetchingNextPage,
  };
};
