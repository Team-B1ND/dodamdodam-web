import { UserApi } from "@/entities/user/api";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const useFixPasswordMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.fixPassword,
    onSuccess: async (res) => toast.success(res.message),
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useFixProfileMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.fixProfile,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["user", "my"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useFixStudentProfileMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.fixStudentProfile,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["user", "my"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useFixTeacherProfileMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.fixTeacherProfile,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["user", "my"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useEnableUserMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.enableUser,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["user", "search"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useRequestPhoneVerificationMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.requestPhoneVerification,
    onSuccess: async (res) => {
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useConfirmPhoneVerificationMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.confirmPhoneVerification,
    onSuccess: async (res) => {
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useLoginMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { redirectUrl } = useSearch({ from: "/login/" });

  return useMutation({
    mutationFn: UserApi.login,
    onSuccess: async () => {
      queryClient.clear();

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        await navigate({ to: "/" });
        toast.success("로그인 성공!");
      }
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useRegisterStudentMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: UserApi.registerStudent,
    onSuccess: () => {
      navigate({ to: "/login", search: { redirectUrl: "/" }});
      toast.success("도담도담 가입을 환영해요!");
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useRegisterTeacherMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: UserApi.registerTeacher,
    onSuccess: () => {
      navigate({ to: "/login", search: { redirectUrl: "/" }});
      toast.success("도담도담에 가입을 환영해요!");
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};
