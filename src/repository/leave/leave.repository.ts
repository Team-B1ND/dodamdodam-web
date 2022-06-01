import { dodamV2Axios } from "../../lib/axios/customAxios";
import {
  deleteMyLeaveParam,
  getMyLeavesParam,
  putMyLeaveParam,
} from "./leave.param";

class LeaveRepository {
  public async getMyLeaves({ date }: getMyLeavesParam) {
    const { data } = await dodamV2Axios.get(`/offbase/date?date=${date}`);
    return data;
  }

  public async deleteMyLeave({ idx }: deleteMyLeaveParam): Promise<void> {
    await dodamV2Axios.post(`/offbase/leave?idx=${idx}`);
  }

  public async putMyLeave(leaveData: putMyLeaveParam): Promise<void> {
    await dodamV2Axios.put("/offbase/leave", leaveData);
  }
}

export default new LeaveRepository();
