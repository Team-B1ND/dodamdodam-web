import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { BannersResponse } from "@src/types/banner/banner.type";
import { Response } from "@src/types/util/response.type";
import { PostBannerParam } from "./banner.param";

class BannerRepository {
  public async getBanners(): Promise<BannersResponse> {
    const { data } = await dodamV6Axios.get<BannersResponse>("/banner/active");
    return data;
  }

  public async postBanners(uploadData: PostBannerParam): Promise<Response> {
    const { data } = await dodamV6Axios.post<Response>("/banner", uploadData);
    return data;
  }
}

export default new BannerRepository();
