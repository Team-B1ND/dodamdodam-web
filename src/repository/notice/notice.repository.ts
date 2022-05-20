import { dodamV2Axios } from "../../lib/axios/customAxios";
import { NoticeResponse } from "../../types/notice/notice.type";

class NoticeRepository {
  public async getNotice(): Promise<NoticeResponse> {
    const { data } = await dodamV2Axios.get<NoticeResponse>("/notice");

    return data;
  }
}

export default new NoticeRepository();
