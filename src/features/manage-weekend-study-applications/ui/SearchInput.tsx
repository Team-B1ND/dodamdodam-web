import { colors } from "@b1nd/dodam-design-system/colors";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { useId, useState } from "react";

interface Props {
  placeholder?: string;
  onSearch: (keyword: string) => void;
}

/**
 * Enter(또는 돋보기 버튼)로 제출할 때만 검색어를 반영해요.
 * keydown 대신 form의 암묵적 제출을 써서, 한글 조합을 확정하는 Enter로 검색되지 않게 해요.
 */
const SearchInput = ({
  placeholder = "검색어 입력 후 Enter key를 누르세요.",
  onSearch,
}: Props) => {
  const [value, setValue] = useState("");
  const inputId = useId();

  return (
    <form
      role="search"
      className="flex items-center gap-3 h-12 w-full sm:w-100 bg-fill-primary rounded-small px-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value.trim());
      }}
    >
      <button
        type="submit"
        aria-label="검색"
        className="shrink-0 cursor-pointer"
      >
        <MagnifyingGlass size={24} color={colors.text.placeholder} />
      </button>
      <label htmlFor={inputId} className="sr-only">
        검색어
      </label>
      <input
        id={inputId}
        type="search"
        enterKeyHint="search"
        className="flex-1 min-w-0 bg-transparent outline-none text-headline text-text-primary placeholder:text-text-placeholder"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (!e.target.value) onSearch("");
        }}
      />
    </form>
  );
};

export default SearchInput;
