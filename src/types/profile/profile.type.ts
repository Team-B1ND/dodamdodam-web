import { Response } from "../util/response.type";

export interface Profile {
  accessLevel: number;
  allowed: number;
  classroomIdx: number;
  email: string;
  grade: number;
  id: string;
  idx: number;
  joinDate: string;
  name: string;
  number: number;
  phone: string;
  placeIdx: number;
  profileImage: string;
  room: number;
}

export interface MyProfileResponse extends Response {
  data: {
    memberData: Profile;
  };
}
