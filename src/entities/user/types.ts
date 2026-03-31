export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  publicId: string;
  username: string;
  name: string;
  phone: string;
  profileImage?: string;
  status: string;
  roles: UserRole[];
  student?: StudentInfo;
  teacher?: TeacherInfo;
  admin?: AdminInfo;
  createdAt: string;
}

export interface StudentInfo {
  grade: number;
  room: number;
  number: number;
  isGraduated: boolean;
}

export interface TeacherInfo {
  position: string;
}

export interface AdminInfo {
  githubId: string;
}

export type UserRole =
  | "STUDENT"
  | "TEACHER"
  | "ADMIN"
  | "BROADCASTER"
  | "DORMITORY_MANAGER";

export interface FixPassword {
  postPassword: string;
  newPassword: string;
}

export interface PhoneVerificationRequest {
  phone: string;
}

export interface PhoneVerificationConfirmRequest {
  phone: string;
  code: string;
}

export interface FixProfile {
  name: string | null;
  phone: string | null;
  profileImage: string | null;
}

export interface FixStudentProfile {
  grade: number | null;
  room: number | null;
  number: number | null;
}

export interface FixTeacherProfile {
  position: string | null;
}


// Register 

export interface UserRegister {
  username: string;
  name: string;
  password: string;
  phone: string;
}

export type StudentPartialRegisterInfo = Omit<Partial<StudentInfo>, "isGraduated">;

export type StudentRegister = UserRegister & StudentPartialRegisterInfo;
export type TeacherRegister = UserRegister & TeacherInfo;