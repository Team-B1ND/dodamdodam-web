/**
 * 전화번호에서 숫자만 추출 후 최대 11자리로 정규화
 */
export const normalizePhoneNumber = (value: string) => value.replace(/\D/g, "").slice(0, 11);
