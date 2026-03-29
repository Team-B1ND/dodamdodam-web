import type { DropdownItem } from "@b1nd/dodam-design-system/components";

const createOptions = (count: number): DropdownItem[] =>
  Array.from({ length: count }, (_, index) => {
    const value = String(index + 1);

    return {
      name: value,
      value,
    };
  });

export const GRADE_OPTIONS = createOptions(3);
export const ROOM_OPTIONS = createOptions(4);
export const NUMBER_OPTIONS = createOptions(19);
