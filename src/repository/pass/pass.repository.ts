import { dodamV2Axios } from "../../lib/axios/customAxios";
import { MyPassesResponse } from "../../types/pass/pass.type";
import {
  deleteMyPassParam,
  getMyPassesParam,
  postApplyPassParam,
  putMyPassParam,
} from "./pass.param";

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

  public async postApplyPass({ passData }: postApplyPassParam): Promise<void> {
    await dodamV2Axios.post("/offbase/pass", passData);
  }

  public async putMyPass({ passIdx, passData }: putMyPassParam): Promise<void> {
    await dodamV2Axios.put("/offbase/pass", { passIdx, passData });
  }
}

export default new PassRepository();
