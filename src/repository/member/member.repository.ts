import config from "@src/config/config.json";
import { MyMemberResponse } from "@src/types/member/member.type";
import { dodamTestAxios, dodamV6Axios } from "@src/lib/axios/customAxios";
import { SignupParam } from "./member.param";
import axios from "axios";

class MemberRepository {
  public async postMemberSignUp(signupData: SignupParam): Promise<void> {
    await axios.post(
      `${config.DODAM_TEST_SERVER}/member/join-student`,
      signupData
    );
  }

  public async getMyMember(): Promise<MyMemberResponse> {
    const { data } = await dodamV6Axios.get("/members/my");
    return data;
  }
}

export default new MemberRepository();
