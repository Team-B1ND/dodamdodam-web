import {
  useDeactivateUserMutation,
  useEnableUserMutation,
} from "@/entities/user/mutations";
import type { User } from "@/entities/user/types";
import { useState } from "react";

export const useUserStatusControl = (users: User[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { mutate: enableUser, isPending: isEnabling } = useEnableUserMutation();
  const { mutate: deactivateUser, isPending: isDeactivating } =
    useDeactivateUserMutation();

  const userMap = new Map(users.map((user) => [user.publicId, user]));
  const selectedUsers = Array.from(selectedIds)
    .map((id) => userMap.get(id))
    .filter((user): user is User => Boolean(user));

  const isAllSelected = users.length > 0 && selectedIds.size === users.length;
  const hasSelectedNonPendingUser = selectedUsers.some(
    (user) => user.status !== "PENDING",
  );
  const hasSelectedDeactiveUser = selectedUsers.some(
    (user) => user.status === "DEACTIVATED",
  );

  const toggleAll = (ids: string[]) => {
    setSelectedIds((prev) =>
      prev.size === ids.length ? new Set() : new Set(ids),
    );
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const handleBulkEnable = () => {
    selectedUsers.forEach((user) => {
      enableUser(
        { userId: user.publicId },
        {
          onSuccess: () => {
            setSelectedIds((prev) => {
              const next = new Set(prev);
              next.delete(user.publicId);
              return next;
            });
          },
        },
      );
    });
  };

  const handleBulkDeactivate = () => {
    selectedUsers.forEach((user) => {
      deactivateUser(
        { userId: user.publicId },
        {
          onSuccess: () => {
            setSelectedIds((prev) => {
              const next = new Set(prev);
              next.delete(user.publicId);
              return next;
            });
          },
        },
      );
    });
  };

  return {
    selectedIds,
    isAllSelected,
    isEnabling,
    isDeactivating,
    hasSelectedNonPendingUser,
    hasSelectedDeactiveUser,
    toggleAll,
    toggleOne,
    handleBulkEnable,
    handleBulkDeactivate,
  };
};
