import type { UserRole } from "@/entities/user/types";
import type { DropdownItem } from "@b1nd/dodam-design-system/components";
import { useState, type Dispatch, type SetStateAction } from "react"

export interface UseFilterUserReturn {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  userStatusDropdown: DropdownItem[];
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  roles: UserRole[];
  toggleSelectRole: (role: UserRole) => void;
  generationOnly: boolean;
  setGenerationOnly: Dispatch<SetStateAction<boolean>>;
}

export const useFilterUser = (): UseFilterUserReturn => {
  const [keyword, setKeyword] = useState("");
  const userStatusDropdown: DropdownItem[] = [
    { name: "전체", value: "" },
    { name: "승인", value: "ACTIVE" },
    { name: "대기 중", value: "PENDING" },
  ];
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [generationOnly, setGenerationOnly] = useState(false);

  const toggleSelectRole = (role: UserRole) => {
    setRoles((prev) =>
      prev.includes(role)
        ? prev.filter((item) => item !== role)
        : [...prev, role],
    );
  };

  return {
    keyword,
    setKeyword,
    userStatusDropdown,
    selectedStatus,
    setSelectedStatus,
    roles,
    toggleSelectRole,
    generationOnly,
    setGenerationOnly,
  };
};
