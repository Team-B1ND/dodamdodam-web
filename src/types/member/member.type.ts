import { ClassRoom } from "@src/types/common/common.type";
import { Response } from "@src/types/util/response.type";

export interface Member {
  id: string;
  name: string;
  email: string;
  readonly role: "STUDENT" | "ADMIN" | "TEACHER";
  readonly status: "ACTIVE" | "DEACTIVATED";
  profileImage: null | string;
  phone: string;
  readonly createdAt: string;
  readonly modifyAt: string;
}

export interface Student {
  id: number;
  name: string;
  grade: number;
  room: number;
  number: number;
}

export interface Teacher {
  id: number;
  tel: string;
  position: string;
}

export interface StudentAndTeacher extends Member {
  student: Student;
  teacher: Teacher;
}

export interface MyMemberResponse extends Response {
  data: StudentAndTeacher;
}
