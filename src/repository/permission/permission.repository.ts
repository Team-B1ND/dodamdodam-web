import { dodamV3Axios } from "../../lib/axios/customAxios";
import { MyPermissionResponse } from "../../types/permission/permission.type";

class Permission {
  public async getMyPermission(): Promise<MyPermissionResponse> {
    const { data } = await dodamV3Axios.get("/permission/my");
    return data;
  }
}

export default new Permission();
