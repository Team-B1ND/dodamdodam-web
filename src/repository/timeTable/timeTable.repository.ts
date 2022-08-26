import { dodamV3Axios } from "../../lib/axios/customAxios";
import { TimeTablesResponse } from "../../types/timeTable/timeTable.type";

class TimeTable {
  public async getTimeTables(): Promise<TimeTablesResponse> {
    const { data } = await dodamV3Axios.get<TimeTablesResponse>("/time/tables");
    return data;
  }
}

export default new TimeTable();
