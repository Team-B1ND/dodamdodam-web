import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { MyPermissionResponse } from "@src/types/permission/permission.type";

class Permission {
  public async getMyPermission(): Promise<MyPermissionResponse> {
    const { data } = await dodamV6Axios.get("/permission/my");
    return data;
  }
}

export default new Permission();
