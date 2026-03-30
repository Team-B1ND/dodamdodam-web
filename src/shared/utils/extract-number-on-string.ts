/**
 * 문자열에서 숫자만 추출하는 함수
 * @param value 원본 문자열
 * @returns 숫자만 남긴 문자열
 */
export const extractNumbersOnString = (value: string): string => {
  return value.replace(/\D/g, "");
};
