import { dodamV2Axios } from "../../lib/axios/customAxios";
import { MyProfileResponse } from "../../types/profile/profile.type";

class ProfileRepository {
  public async getMyProfile(): Promise<MyProfileResponse> {
    const { data } = await dodamV2Axios.get<MyProfileResponse>("/members/my");
    return data;
  }
}

export default new ProfileRepository();
