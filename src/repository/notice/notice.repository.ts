import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { NoticeResponse } from "@src/types/notice/notice.type";

class NoticeRepository {
  public async getNotice(): Promise<NoticeResponse> {
    const { data } = await dodamV6Axios.get<NoticeResponse>("/notice/active");

    return data;
  }
}

export default new NoticeRepository();
