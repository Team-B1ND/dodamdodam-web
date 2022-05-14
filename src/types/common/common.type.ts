export type UserInfo = {
  accessLevel: number;
  email: string;
  id: string;
  name: string;
  permissions: string[];
  profileImage: string;
  refreshToken: string;
  token: string;
};

export type UserInfoDetail = {
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
};
