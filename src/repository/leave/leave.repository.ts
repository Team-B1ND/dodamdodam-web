import { MyLeavesResponse } from "@src/types/leave/leave.type";
import { dodamTestAxios, dodamV6Axios } from "@src/lib/axios/customAxios";
import {
  deleteMyLeaveParam,
  postApplyLeaveParam,
  putMyLeaveParam,
} from "./leave.param";

class LeaveRepository {
  public async getMyLeaves(): Promise<MyLeavesResponse> {
    const { data } = await dodamTestAxios.get<MyLeavesResponse>(
      "/out-sleeping/my"
    );
    return data;
  }

  public async postApplyLeave(leaveData: postApplyLeaveParam): Promise<void> {
    await dodamTestAxios.post("/out-sleeping", leaveData);
  }

  public async deleteMyLeave({ id }: deleteMyLeaveParam): Promise<void> {
    await dodamTestAxios.delete(`/out-sleeping/${id}`);
  }

  public async putMyLeave(leaveData: putMyLeaveParam): Promise<void> {
    await dodamV6Axios.put("/out/outsleeping", leaveData);
  }
}

export default new LeaveRepository();
