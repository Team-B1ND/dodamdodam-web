import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { TimeTablesResponse } from "@src/types/timeTable/timeTable.type";

class TimeTable {
  public async getTimeTables(): Promise<TimeTablesResponse> {
    const { data } = await dodamV6Axios.get<TimeTablesResponse>("/time/tables");
    return data;
  }
}

export default new TimeTable();
