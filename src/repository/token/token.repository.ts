import { RefreshResponse } from "../../types/token/token.type";
import { RefreshTokenParam } from "./token.param";
import config from "../../config/config.json";
import axios from "axios";

class TokenRepository {
  public async getRefreshToken(
    refreshToken: RefreshTokenParam
  ): Promise<RefreshResponse> {
    const { data } = await axios.post<RefreshResponse>(
      `${config.DODAM_SERVER_V3}/token/refresh`,
      refreshToken
    );
    return data;
  }
}

export default new TokenRepository();
