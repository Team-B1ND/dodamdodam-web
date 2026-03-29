/**
 * 비밀번호가 영문(a-z, A-Z) + 숫자 + 특수문자만 포함하는지 검사
 */
export const isValidPassword = (password: string): boolean => {
  const regex = /^[A-Za-z0-9!@#$%^&*()\-_=+[{\]}\\|;:'",.<>/?`~]+$/;
  return regex.test(password);
};
