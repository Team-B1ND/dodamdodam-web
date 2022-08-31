import { RefreshResponse } from "../../types/token/token.type";
import { RefreshTokenParam } from "./token.param";
import axios from "axios";
import config from "../../config/config.json";

class TokenRepository {
  public async getRefreshToken(
    token: RefreshTokenParam
  ): Promise<RefreshResponse> {
    const { data } = await axios.post<RefreshResponse>(
      `${config.DODAM_SERVER_V3}/token/refresh`,
      token
    );

    return data;
  }
}

export default new TokenRepository();
