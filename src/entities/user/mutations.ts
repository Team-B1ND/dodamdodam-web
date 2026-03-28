import { useMutation } from "@tanstack/react-query";
import { useToast } from "@b1nd/dodam-design-system/components";
import type { ErrorResponse } from "@b1nd/api-client";
import { UserApi } from "./api";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const useLoginMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { redirectUrl } = useSearch({ from: "/login/" });

  return useMutation({
    mutationFn: UserApi.login,
    onSuccess: () => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        navigate({ to: "/" });
        toast.success("로그인 성공!");
      }
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};
