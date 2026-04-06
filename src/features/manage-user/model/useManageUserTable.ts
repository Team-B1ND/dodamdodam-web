import { useSearchUserQuery } from "@/entities/user/queries";
import type { User, UserStatus } from "@/entities/user/types";
import type { UseFilterUserReturn } from "@/features/manage-user/model/useFilterUser";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const USER_STATUS_VALUE_MAP: Record<string, UserStatus | null> = {
  전체: null,
  승인: "ACTIVE",
  미승인: "DEACTIVE",
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
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchUserQuery({
    keyword: debouncedKeyword,
    roles,
    generationOnly,
  });

  const users = data.pages.flatMap((page) => page.data.content);
  const targetStatus = USER_STATUS_VALUE_MAP[selectedStatus] ?? null;
  const filteredUsers = targetStatus
    ? users.filter((user: User) => user.status === targetStatus)
    : users;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    users: filteredUsers,
    ref,
    isFetchingNextPage,
  };
};

