import { dodamV3Axios } from "../../lib/axios/customAxios";
import { BannersResponse } from "../../types/banner/banner.type";

class BannerRepository {
  public async getBanners(): Promise<BannersResponse> {
    const { data } = await dodamV3Axios.get<BannersResponse>("/banner/active");
    return data;
  }
}

export default new BannerRepository();
