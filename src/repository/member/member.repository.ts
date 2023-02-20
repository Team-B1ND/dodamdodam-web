import { MyMemberResponse } from "@src/types/member/member.type";
import { dodamV6Axios } from "@src/lib/axios/customAxios";

class MemberRepository {
  public async getMyMember(): Promise<MyMemberResponse> {
    const { data } = await dodamV6Axios.get<MyMemberResponse>("/members/my");
    return data;
  }
}

export default new MemberRepository();
