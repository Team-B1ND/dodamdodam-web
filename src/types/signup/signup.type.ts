export interface Signup {
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
}

export interface SignupAgree {
  first: boolean;
  second: boolean;
}
