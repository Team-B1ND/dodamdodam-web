import type { ErrorResponse } from "@b1nd/api-client";

const DEFAULT_ERROR_MESSAGE =
  "문제가 발생했어요. 잠시 후 다시 시도해주세요.";

export const getErrorMessage = (error: unknown) => {
  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (error && typeof error === "object") {
    const responseError = error as Partial<ErrorResponse> & {
      response?: {
        data?: {
          message?: unknown;
        };
      };
    };

    if (
      typeof responseError.response?.data?.message === "string" &&
      responseError.response.data.message.trim().length > 0
    ) {
      return responseError.response.data.message;
    }

    if (
      typeof responseError.message === "string" &&
      responseError.message.trim().length > 0
    ) {
      return responseError.message;
    }
  }

  return DEFAULT_ERROR_MESSAGE;
};

