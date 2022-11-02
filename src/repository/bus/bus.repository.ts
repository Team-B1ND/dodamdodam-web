import { dodamV3Axios } from "../../lib/axios/customAxios";
import { BusesResponse, MyBusResponse } from "../../types/bus/bus.type";
import { patchMyBusParam, postMyBusParam } from "./bus.param";

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
    await dodamV3Axios.post(`/bus/apply?busId=${idx}`);
  }

  public async patchMyBus({ idx, originIdx }: patchMyBusParam): Promise<void> {
    await dodamV3Axios.patch(
      `/bus/apply?busId=${idx}&originalBusId=${originIdx}`
    );
  }
}

export default new BusRepository();
