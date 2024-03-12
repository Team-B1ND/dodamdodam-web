import { dodamTestAxios, dodamV6Axios } from "@src/lib/axios/customAxios";
import { BannersResponse } from "@src/types/banner/banner.type";

class BannerRepository {
  public async getBanners(): Promise<BannersResponse> {
    const { data } = await dodamTestAxios.get("/banner/active");
    return data;
  }
}

export default new BannerRepository();
