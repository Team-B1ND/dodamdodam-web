import { useMutation } from "react-query";
import logRepository from "@src/repository/log/log.repository";
import { postModuleLogParam } from "@src/repository/log/log.param";

export const usePostModuleLogMutation = () => {
  const mutation = useMutation(
    ({ description, moduleName }: postModuleLogParam) =>
      logRepository.postModuleLog({ description, moduleName })
  );

  return mutation;
};
