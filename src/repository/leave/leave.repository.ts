import { MyLeavesResponse } from "@src/types/leave/leave.type";
import { dodamV6Axios } from "@src/lib/axios/customAxios";
import {
  deleteMyLeaveParam,
  postApplyLeaveParam,
  putMyLeaveParam,
} from "./leave.param";

class LeaveRepository {
  public async getMyLeaves(): Promise<MyLeavesResponse> {
    const { data } = await dodamV6Axios.get<MyLeavesResponse>(
      "out/outsleeping/my"
    );
    return data;
  }

  public async postApplyLeave(leaveData: postApplyLeaveParam): Promise<void> {
    await dodamV6Axios.post("/out/outsleeping", leaveData);
  }

  public async deleteMyLeave({
    outsleepingId,
  }: deleteMyLeaveParam): Promise<void> {
    await dodamV6Axios.delete(`/out/outsleeping/${outsleepingId}`);
  }

  public async putMyLeave(leaveData: putMyLeaveParam): Promise<void> {
    await dodamV6Axios.put("/out/outsleeping", leaveData);
  }
}

export default new LeaveRepository();
