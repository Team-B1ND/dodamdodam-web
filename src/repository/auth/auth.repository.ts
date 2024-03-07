import axios from "axios";
import { LoginResponse } from "@src/types/login/login.type";
import { LoginParam, NewAccessTokenResponse } from "./auth.param";
import config from "@src/config/config.json";

class AuthRepository {
  public async login(loginData: LoginParam): Promise<LoginResponse> {
    const { data } = await axios.post(
      `${config.DODAM_SERVER_V6}/auth/login`,
      loginData
    );
    return data;
  }

  public async refreshAccessToken(refreshToken: {
    refreshToken: string;
  }): Promise<NewAccessTokenResponse> {
    const { data } = await axios.post<NewAccessTokenResponse>(
      `${config.DODAM_SERVER_V6}/auth/reissue`,
      refreshToken
    );
    return data;
  }
}

export default new AuthRepository();
