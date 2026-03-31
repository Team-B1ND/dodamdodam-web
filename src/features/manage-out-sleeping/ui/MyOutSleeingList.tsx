import { useDeleteOutSleepingMutation } from "@/entities/out-sleeping/mutations";
import { useGetMyOutSleepingQuery } from "@/entities/out-sleeping/queries";
import { useOutSleepingPageStore } from "@/features/manage-out-sleeping/stores/out-sleeping-page";
import { parseOutSleepingStatus } from "@/features/manage-out-sleeping/utils/parse-out-sleeping-status";
import { colors } from "@b1nd/dodam-design-system/colors";
import { FilledButton, Tag } from "@b1nd/dodam-design-system/components";
import { Trash } from "@b1nd/dodam-design-system/icons";

const MyOutSleeingList = () => {
  const { data } = useGetMyOutSleepingQuery();
  const { mutateAsync, isPending } = useDeleteOutSleepingMutation();

  const { setPage } = useOutSleepingPageStore();

  return (
    <div className="flex flex-col gap-3">
      {data.data.length !== 0 ? (data.data.map((item) => (
        <div className="flex flex-col gap-1">
          <Tag color="blue" text={parseOutSleepingStatus(item.status)} customStyle={{ alignSelf:"start" }} />
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 grow">
              <p className="text-text-primary text-body2 font-medium grow">{item.reason}</p>
              <p className="text-text-tertiary text-label font-normal">{`${item.startAt} ~ ${item.endAt}`}</p>
            </div>
            <div className={`bg-fill-primary h-fit p-1 rounded-extrasmall ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => isPending ? {} : mutateAsync(item.publicId)}>
              <Trash pointer color={colors.text.tertiary} size={20}/>
            </div>
          </div>
        </div>
      ))) : (
        <div className="flex justify-center items-center h-52 text-headline font-medium">
          외박 신청 기록이 없어요.
        </div>
      )}
      <FilledButton role="assistive" onClick={() => setPage("apply")}>
        돌아가기
      </FilledButton>
    </div>
  );
}

MyOutSleeingList.Skeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="flex flex-col gap-1" key={index}>
          <div className="w-12 h-8 rounded-full skeleton" />
          <div className="flex flex-col gap-1 grow">
            <div className="grow h-4 skeleton rounded-medium" />
            <div className="grow h-4 skeleton rounded-medium" />
            <div className="w-30 h-4 skeleton rounded-medium" />
          </div>
        </div>
      ))}
      <FilledButton role="assistive">로딩 중...</FilledButton>
    </div>
  );
}

export default MyOutSleeingList