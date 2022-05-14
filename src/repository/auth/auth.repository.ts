import { tokenAxios } from "../../lib/axios/customAxios";
import { LoginResponse } from "../../types/login/login.type";
import { LoginParam } from "./auth.param";

class AuthRepository {
  public async login(loginData: LoginParam): Promise<LoginResponse> {
    console.log(loginData);
    const { data } = await tokenAxios.post("/auth/login", loginData);
    return data;
  }
}

export default new AuthRepository();
