export type Signup = {
  id: string;
  pw: string;
  generation: number;
  email: string;
  name: string;
  phone: string;
  role: string;
  grade: number;
  room: number;
  number: number;
  tel: string;
  position: string;
};

export type SignupAgree = {
  first: boolean;
  second: boolean;
};
