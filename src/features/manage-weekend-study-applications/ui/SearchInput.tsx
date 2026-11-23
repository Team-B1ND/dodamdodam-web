import { colors } from "@b1nd/dodam-design-system/colors";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { useState } from "react";

interface Props {
  placeholder?: string;
  onSearch: (keyword: string) => void;
}

/** Enter를 눌렀을 때만 검색어를 반영해요. */
const SearchInput = ({
  placeholder = "검색어 입력 후 Enter key를 누르세요.",
  onSearch,
}: Props) => {
  const [value, setValue] = useState("");

  return (
    <label className="flex items-center gap-3 h-12 w-full sm:w-100 bg-fill-primary rounded-small px-3">
      <MagnifyingGlass size={24} color={colors.text.placeholder} />
      <input
        type="search"
        enterKeyHint="search"
        aria-label="검색"
        className="flex-1 min-w-0 bg-transparent outline-none text-headline text-text-primary placeholder:text-text-placeholder"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (!e.target.value) onSearch("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            onSearch(value.trim());
          }
        }}
      />
    </label>
  );
};

export default SearchInput;
