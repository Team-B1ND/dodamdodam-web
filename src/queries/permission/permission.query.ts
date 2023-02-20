import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import permissionRepository from "@src/repository/permission/permission.repository";
import { MyPermissionResponse } from "@src/types/permission/permission.type";

export const useGetMyPermissionQuery = (
  options: UseQueryOptions<
    MyPermissionResponse,
    AxiosError,
    MyPermissionResponse,
    "permission/myPermission"
  >
) =>
  useQuery(
    "permission/myPermission",
    () => permissionRepository.getMyPermission(),
    options
  );
