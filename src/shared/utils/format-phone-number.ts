/**
 * 3-4-4 고정 전화번호 포매팅 (010-1234-5678)
 * 숫자만 추출 후 최대 11자리 기준으로 포맷
 */
export function formatPhoneNumber(input: string): string {
  const numbers = input.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}
