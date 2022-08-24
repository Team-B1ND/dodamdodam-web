import { MyMemberResponse } from "types/member/member.type";
import { dodamV3Axios } from "../../lib/axios/customAxios";

class MemberRepository {
  public async getMyMember(): Promise<MyMemberResponse> {
    const { data } = await dodamV3Axios.get<MyMemberResponse>("/members/my");
    return data;
  }
}

export default new MemberRepository();
