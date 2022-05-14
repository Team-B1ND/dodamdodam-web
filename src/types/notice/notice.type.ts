export type Notice = {
  content: string;
  createdAt: string;
  expireTime: string;
  id: number;
  memberId: string;
  popUp: boolean;
  title: string;
};

export type NoticeResponse = Response & {
  data: Notice[];
};
