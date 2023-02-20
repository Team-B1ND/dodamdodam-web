import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { BusesResponse, MyBusResponse } from "@src/types/bus/bus.type";
import { patchMyBusParam, postMyBusParam } from "./bus.param";

class BusRepository {
  public async getBuses(): Promise<BusesResponse> {
    const { data } = await dodamV6Axios.get<BusesResponse>("/bus");
    return data;
  }

  public async getMyBus(): Promise<MyBusResponse> {
    const { data } = await dodamV6Axios.get<MyBusResponse>("/bus/apply");
    return data;
  }

  public async postMyBus({ idx }: postMyBusParam): Promise<void> {
    await dodamV6Axios.post(`/bus/apply?busId=${idx}`);
  }

  public async patchMyBus({ idx, originIdx }: patchMyBusParam): Promise<void> {
    await dodamV6Axios.patch(
      `/bus/apply?busId=${idx}&originalBusId=${originIdx}`
    );
  }
}

export default new BusRepository();
