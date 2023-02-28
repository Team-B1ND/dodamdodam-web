import axios from "axios";
import { LoginResponse } from "@src/types/login/login.type";
import { LoginParam, SignupParam } from "./auth.param";
import config from "@src/config/config.json";

class AuthRepository {
  public async login(loginData: LoginParam): Promise<LoginResponse> {
    const { data } = await axios.post(
      `${config.DODAM_SERVER_V6}/auth/login`,
      loginData
    );

    return data;
  }

  public async signup(signupData: SignupParam): Promise<void> {
    await axios.post(`${config.DODAM_SERVER_V6}/auth/join-student`, signupData);
  }
}

export default new AuthRepository();
