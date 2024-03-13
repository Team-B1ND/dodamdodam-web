import { dodamTestAxios, dodamV6Axios } from "@src/lib/axios/customAxios";
import { BusesResponse, MyBusResponse } from "@src/types/bus/bus.type";
import { patchMyBusParam, postMyBusParam } from "./bus.param";

class BusRepository {
  public async getBuses(): Promise<BusesResponse> {
    const { data } = await dodamTestAxios.get("/bus");
    return data;
  }

  public async getMyBus(): Promise<MyBusResponse> {
    const { data } = await dodamTestAxios.get<MyBusResponse>("/bus/apply");
    return data;
  }

  public async postMyBus({ idx }: postMyBusParam): Promise<void> {
    await dodamTestAxios.post(`/bus/apply/${idx}`);
  }

  public async patchMyBus({ idx }: patchMyBusParam): Promise<void> {
    await dodamTestAxios.patch(`/bus/apply/${idx}`);
  }
}

export default new BusRepository();
