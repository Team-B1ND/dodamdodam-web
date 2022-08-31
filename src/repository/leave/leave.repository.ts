import { MyLeavesResponse } from "types/leave/leave.type";
import { dodamV2Axios, dodamV3Axios } from "../../lib/axios/customAxios";
import {
  deleteMyLeaveParam,
  postApplyLeaveParam,
  putMyLeaveParam,
} from "./leave.param";

class LeaveRepository {
  public async getMyLeaves(): Promise<MyLeavesResponse> {
    const { data } = await dodamV3Axios.get<MyLeavesResponse>(
      "out/outsleeping/my"
    );
    return data;
  }

  public async postApplyLeave(leaveData: postApplyLeaveParam): Promise<void> {
    await dodamV3Axios.post("/out/outsleeping", leaveData);
  }

  public async deleteMyLeave({
    outsleepingId,
  }: deleteMyLeaveParam): Promise<void> {
    await dodamV3Axios.delete(`/out/outsleeping/${outsleepingId}`);
  }

  public async putMyLeave(leaveData: putMyLeaveParam): Promise<void> {
    await dodamV3Axios.put("/out/outsleeping", leaveData);
  }
}

export default new LeaveRepository();
