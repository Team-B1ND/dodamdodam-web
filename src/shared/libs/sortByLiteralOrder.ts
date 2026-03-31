/**
 * 특정 리터럴 값의 우선순위 배열을 기준으로 객체 배열을 정렬한다.
 * order에 정의되지 않은 값은 가장 뒤로 정렬된다.
 *
 * @param arr 정렬할 배열 (원본 배열이 직접 변경됨)
 * @param key 정렬 기준이 되는 객체의 키
 * @param order 원하는 정렬 순서를 정의한 값 배열
 * @returns 정렬된 동일 배열
 */
export const sortByLiteralOrder = <T, K extends keyof T>(
  arr: T[],
  key: K,
  order: readonly T[K][],
): T[] => {
  const map = new Map(order.map((v, i) => [v, i]));
  return arr.sort((a, b) => {
    return (map.get(a[key]) ?? Infinity) - (map.get(b[key]) ?? Infinity);
  });
};
