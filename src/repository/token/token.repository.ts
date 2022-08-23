import { RefreshResponse } from "../../types/token/token.type";
import { RefreshTokenParam } from "./token.param";
import { dodamV3Axios } from "../../lib/axios/customAxios";

class TokenRepository {
  public async getRefreshToken(
    token: RefreshTokenParam
  ): Promise<RefreshResponse> {
    const { data } = await dodamV3Axios.post<RefreshResponse>(
      `/token/refresh`,
      token
    );
    return data;
  }
}

export default new TokenRepository();
