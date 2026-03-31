/**
 * 영문 + 숫자만 남기는 함수
 * @param value 원본 문자열
 * @returns 영문/숫자만 남긴 문자열
 */
export const extractEngAndNumberOnString = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
};
