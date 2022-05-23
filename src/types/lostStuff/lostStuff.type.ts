import { Response } from "../util/response.type";

export interface LostStuff {
  comment: LostStuffComment[];
  contact: any;
  content: string;
  idx: number;
  memberId: string;
  modifyTime: null | string;
  picture: LostStuffPicture[];
  place: string;
  profileImage: string;
  title: string;
  type: number;
  uploadTime: string;
}

export interface LostStuffPicture {
  originalName: string;
  thumbnail: string;
  type: string;
  uploadName: string;
  url: string;
}

export interface LostStuffComment {
  comment: string;
  idx: string;
  isUpdate: number;
  lostfoundIdx: number;
  memberId: string;
  profileImage: string;
  writeTime: string;
}

export interface MyLostStuffsResponse extends Response {
  data: {
    result: LostStuff[];
  };
}
