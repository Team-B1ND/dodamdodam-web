import { dodamAxios } from "../../lib/axios/customAxios";
import { NoticeResponse } from "../../types/notice/notice.type";

class NoticeRepository {
  public async getNotice(): Promise<NoticeResponse> {
    const { data } = await dodamAxios.get<NoticeResponse>("/notice");

    return data;
  }
}

export default new NoticeRepository();
