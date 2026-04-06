import { USER_ROLE_MAP, type UserRole } from "@/entities/user/types";
import { type UseFilterUserReturn } from "@/features/manage-user/model/useFilterUser";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  Checkbox,
  Dropdown,
  FilledButton,
  Switch,
} from "@b1nd/dodam-design-system/components";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { useState } from "react";

const ManageUserFilter = (props: UseFilterUserReturn) => {
  const [isDetailFilterOpen, setIsDetailFilterOpen] = useState(true);
  const {
    keyword,
    setKeyword,
    userStatusDropdown,
    selectedStatus,
    setSelectedStatus,
    roles,
    toggleSelectRole,
    generationOnly,
    setGenerationOnly,
  } = props;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 h-12 w-100 bg-fill-primary rounded-small px-3">
          <MagnifyingGlass size={24} color={colors.text.placeholder} />
          <input
            className="flex-1 bg-transparent outline-none text-headline text-text-primary placeholder:text-text-placeholder"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <FilledButton
          size="large"
          onClick={() => setIsDetailFilterOpen((prev) => !prev)}
        >
          필터 설정
        </FilledButton>
      </div>
      {isDetailFilterOpen ? (
        <div className="flex items-center border border-border-normal rounded-small small-container gap-9">
          <div className="flex gap-3 items-center">
            <p className="text-headline font-bold">권한</p>
            {Object.keys(USER_ROLE_MAP).map(item => (
              <div className="flex gap-1.5" key={item}>
                <Checkbox selected={roles.includes(item as UserRole)} size="small" onClick={() => toggleSelectRole(item as UserRole)} />
                <p className="text-body1 font-medium">
                  {USER_ROLE_MAP[item as UserRole]}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-headline font-bold">상태</p>
            <Dropdown
              items={userStatusDropdown}
              value={selectedStatus}
              onSelectedItemChange={(item) => setSelectedStatus(item.name)}
            />
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-headline font-bold">재학생만 보기</p>
            <Switch
              checked={generationOnly}
              onChange={() => setGenerationOnly((prev) => !prev)}
              size="small"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManageUserFilter;
