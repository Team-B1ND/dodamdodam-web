import { dodamV2Axios } from "../../lib/axios/customAxios";
import { BannersResponse } from "../../types/banner/banner.type";

class BannerRepository {
  public async getBanners(): Promise<BannersResponse> {
    const { data } = await dodamV2Axios.get<BannersResponse>("/banner");
    return data;
  }
}

export default new BannerRepository();
