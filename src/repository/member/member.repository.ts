import config from "@src/config/config.json";
import { MyMemberResponse } from "@src/types/member/member.type";
import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { SignupParam } from "./member.param";
import axios from "axios";

class MemberRepository {
  public async postMemberSignUp(signupData: SignupParam): Promise<void> {
    await axios.post(
      `${config.DODAM_SERVER_V6}/member/join-student`,
      signupData
    );
  }

  public async getMyMember(): Promise<MyMemberResponse> {
    const { data } = await dodamV6Axios.get<MyMemberResponse>("/members/my");
    return data;
  }
}

export default new MemberRepository();
