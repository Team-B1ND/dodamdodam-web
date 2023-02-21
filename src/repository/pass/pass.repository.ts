import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { MyPassesResponse } from "@src/types/pass/pass.type";
import {
  deleteMyPassParam,
  postApplyPassParam,
  putMyPassParam,
} from "./pass.param";

class PassRepository {
  public async getMyPasses(): Promise<MyPassesResponse> {
    const { data } = await dodamV6Axios.get(`/out/outgoing/my`);
    return data;
  }

  public async deleteMyPass({ outgoingId }: deleteMyPassParam): Promise<void> {
    await dodamV6Axios.delete(`/out/outgoing/${outgoingId}`);
  }

  public async postApplyPass(passData: postApplyPassParam): Promise<void> {
    await dodamV6Axios.post("/out/outgoing", passData);
  }

  public async putMyPass(passData: putMyPassParam): Promise<void> {
    await dodamV6Axios.put("/out/outgoing", passData);
  }
}

export default new PassRepository();
