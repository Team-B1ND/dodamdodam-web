import { dodamV2Axios, dodamV3Axios } from "../../lib/axios/customAxios";
import { BusesResponse, MyBusResponse } from "../../types/bus/bus.type";
import { deleteMyBusParam, postMyBusParam, putMyBusParam } from "./bus.param";

class BusRepository {
  public async getBuses(): Promise<BusesResponse> {
    const { data } = await dodamV3Axios.get<BusesResponse>("/bus");
    return data;
  }

  public async getMyBus(): Promise<MyBusResponse> {
    const { data } = await dodamV3Axios.get<MyBusResponse>("/bus/apply");
    return data;
  }

  public async postMyBus({ idx }: postMyBusParam): Promise<void> {
    await dodamV3Axios.post("/bus/apply", { busId: idx });
  }

  public async deleteMyBus({ idx }: deleteMyBusParam): Promise<void> {
    await dodamV3Axios.delete(`/bus/apply?idx=${idx}`);
  }

  public async putMyBus({ idx }: putMyBusParam): Promise<void> {
    await dodamV3Axios.patch("/bus/apply", {
      busId: idx,
    });
  }
}

export default new BusRepository();
