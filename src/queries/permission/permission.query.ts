import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import permissionRepository from "@src/repository/permission/permission.repository";
import { MyPermissionResponse } from "@src/types/permission/permission.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyPermissionQuery = (
  options: UseQueryOptions<
    MyPermissionResponse,
    AxiosError,
    MyPermissionResponse,
    string
  >
) =>
  useQuery(
    QUERY_KEYS.permission.getMy,
    () => permissionRepository.getMyPermission(),
    options
  );
