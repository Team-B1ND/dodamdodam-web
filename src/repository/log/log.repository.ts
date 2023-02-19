import { dodamV6Axios } from "../../lib/axios/customAxios";
import { postModuleLogParam } from "./log.param";

class LogRepoisitory {
  public async postModuleLog({
    description,
    moduleName,
  }: postModuleLogParam): Promise<void> {
    await dodamV6Axios.post("/logging/function", {
      description,
      moduleName,
      platform: "WEB",
    });
  }
}

export default new LogRepoisitory();
