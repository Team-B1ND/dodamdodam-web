import { dodamV2Axios } from "../../lib/axios/customAxios";
import { MyPassesResponse } from "../../types/pass/pass.type";
import { deleteMyPassParam, getMyPassesParam } from "./pass.param";

class PassRepository {
  public async getMyPasses({
    date,
  }: getMyPassesParam): Promise<MyPassesResponse> {
    const { data } = await dodamV2Axios.get(`/offbase/date?date=${date}`);
    return data;
  }

  public async deleteMyPass({ idx }: deleteMyPassParam): Promise<void> {
    await dodamV2Axios.delete(`/offbase/pass?idx=${idx}`);
  }
}

export default new PassRepository();
