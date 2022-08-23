import { dodamV2Axios, dodamV3Axios } from "../../lib/axios/customAxios";
import { NoticeResponse } from "../../types/notice/notice.type";

class NoticeRepository {
  public async getNotice(): Promise<NoticeResponse> {
    const { data } = await dodamV3Axios.get<NoticeResponse>("/notice/active");

    return data;
  }
}

export default new NoticeRepository();
