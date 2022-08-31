import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import permissionRepository from "../../repository/permission/permission.repository";
import { MyPermissionResponse } from "../../types/permission/permission.type";

export const useGetMyPermission = (
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
