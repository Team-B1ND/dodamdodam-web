export interface Notice {
  content: string;
  createdAt: string;
  expireTime: string;
  id: number;
  memberId: string;
  popUp: boolean;
  title: string;
}

export interface NoticeResponse extends Response {
  data: {
    notice: Notice[];
  };
}
