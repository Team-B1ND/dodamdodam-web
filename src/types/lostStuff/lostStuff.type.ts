import { Response } from "../util/response.type";

export type LostStuff = {
  comment: LostStuffComment[];
  contact: any;
  content: string;
  idx: number;
  memberId: string;
  modifyTime: null | string;
  picture: {
    originalName: string;
    thumbnail: string;
    type: string;
    uploadName: string;
    url: string;
  }[];
  place: string;
  profileImage: string;
  title: string;
  type: number;
  uploadTime: string;
};

export type LostStuffComment = {
  comment: string;
  idx: string;
  isUpdate: number;
  lostfoundIdx: number;
  memberId: string;
  profileImage: string;
  writeTime: string;
};

export type MyLostStuffsResponse = Response & {
  data: {
    result: LostStuff[];
  };
};
