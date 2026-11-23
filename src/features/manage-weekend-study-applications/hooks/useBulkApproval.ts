import {
  useAllowWeekendStudyMutation,
  useRejectWeekendStudyMutation,
} from "@/entities/weekend-study/mutations";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

const notifyResult = (
  toast: ReturnType<typeof useToast>,
  results: PromiseSettledResult<unknown>[],
  successText: string,
) => {
  const failed = results.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );
  if (failed.length === 0) {
    toast.success(successText);
    return;
  }
  const reason = failed[0].reason as { message?: string } | undefined;
  toast.error(
    `${failed.length}건을 처리하지 못했어요. ${reason?.message ?? ""}`.trim(),
  );
};

/** 여러 신청을 한 번에 승인·거절하고 결과를 한 번만 알려요. */
export const useBulkApproval = () => {
  const toast = useToast();
  const { mutateAsync: allow } = useAllowWeekendStudyMutation({
    notify: false,
  });
  const { mutateAsync: reject } = useRejectWeekendStudyMutation({
    notify: false,
  });
  const [isPending, setIsPending] = useState(false);

  const bulkAllow = async (ids: string[]) => {
    setIsPending(true);
    const results = await Promise.allSettled(ids.map((id) => allow(id)));
    setIsPending(false);
    notifyResult(toast, results, `${ids.length}건을 승인했어요.`);
  };

  const bulkReject = async (ids: string[], rejectionReason: string) => {
    setIsPending(true);
    const results = await Promise.allSettled(
      ids.map((id) => reject({ id, rejectionReason })),
    );
    setIsPending(false);
    notifyResult(toast, results, `${ids.length}건을 거절했어요.`);
  };

  return { bulkAllow, bulkReject, isPending };
};
