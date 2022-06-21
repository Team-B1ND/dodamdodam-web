import { dodamV2Axios } from "../../lib/axios/customAxios";
import { BusesResponse, MyBusResponse } from "../../types/bus/bus.type";
import { deleteMyBusParam, postMyBusParam, putMyBusParam } from "./bus.param";

class BusRepository {
  public async getBuses(): Promise<BusesResponse> {
    const { data } = await dodamV2Axios.get<BusesResponse>("/bus");
    return data;
  }

  public async getMyBus(): Promise<MyBusResponse> {
    const { data } = await dodamV2Axios.get<MyBusResponse>("/bus/self");
    return data;
  }

  public async postMyBus({ idx }: postMyBusParam): Promise<void> {
    await dodamV2Axios.post("/bus/self", { busIdx: idx });
  }

  public async deleteMyBus({ idx }: deleteMyBusParam): Promise<void> {
    await dodamV2Axios.delete(`/bus/self?idx=${idx}`);
  }

  public async putMyBus({ idx, originIdx }: putMyBusParam): Promise<void> {
    await dodamV2Axios.put("/bus/self", {
      busIdx: idx,
      originBusIdx: originIdx,
    });
  }
}

export default new BusRepository();
