import { dodamV3Axios, tokenAxios } from "../../lib/axios/customAxios";
import { LoginResponse } from "../../types/login/login.type";
import { LoginParam, SignupParam } from "./auth.param";

class AuthRepository {
  public async login(loginData: LoginParam): Promise<LoginResponse> {
    const { data } = await tokenAxios.post("/auth/login", loginData);

    return data;
  }

  public async signup(signupData: SignupParam): Promise<void> {
    await dodamV3Axios.post("/auth/join", signupData);
  }
}

export default new AuthRepository();
