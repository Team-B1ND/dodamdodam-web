export const parseDate = (date: string) => {
  const tokens = date.split("-");
  const mm = tokens[1];
  const dd = tokens[2];

  return `${mm}월 ${dd}일`;
};
