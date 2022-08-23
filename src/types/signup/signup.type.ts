export interface Signup {
  id: string;
  pw: string;
  email: string;
  name: string;
  phone: string;
  position?: string;
  role: "STUDENT" | "TEACHER";
  grade: number;
  room: number;
  number: number;
  tel?: string;
}

export interface SignupAgree {
  first: boolean;
  second: boolean;
}
