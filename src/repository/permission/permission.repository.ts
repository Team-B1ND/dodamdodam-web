import { dodamAxios } from "@src/lib/axios/customAxios";
import { MyPermissionResponse } from "@src/types/permission/permission.type";

class Permission {
  public async getMyPermission(): Promise<MyPermissionResponse> {
    const { data } = await dodamAxios.get("/member/my");
    return data;
  }
}

export default new Permission();
