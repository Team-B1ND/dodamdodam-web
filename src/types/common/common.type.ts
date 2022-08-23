// export interface UserInfo {
//   accessLevel: number;
//   email: string;
//   id: string;
//   name: string;
//   permissions: string[];
//   profileImage: string;
// }

// export interface UserInfoDetail {
//   accessLevel: number;
//   allowed: number;
//   classroomIdx: number;
//   email: string;
//   grade: number;
//   id: string;
//   idx: number;
//   joinDate: string;
//   name: string;
//   number: number;
//   phone: string;
//   placeIdx: number;
//   profileImage: string;
//   room: number;
// }

export interface ClassRoom {
  readonly grade: number;
  readonly id: number;
  readonly placeId: number;
  readonly room: number;
}
