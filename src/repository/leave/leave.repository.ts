import { dodamV2Axios } from "../../lib/axios/customAxios";

class LeaveRepository {
  public async getMyLeaves() {
    const { data } = await dodamV2Axios.get("/offbase/date?date");
  }
}
