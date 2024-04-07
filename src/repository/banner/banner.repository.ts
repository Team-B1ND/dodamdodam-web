import { dodamAxios } from "@src/lib/axios/customAxios";
import { BannersResponse } from "@src/types/banner/banner.type";

class BannerRepository {
  public async getBanners(): Promise<BannersResponse> {
    const { data } = await dodamAxios.get("/banner/active");
    return data;
  }
}

export default new BannerRepository();
