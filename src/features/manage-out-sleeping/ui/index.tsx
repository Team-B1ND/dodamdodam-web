import { useOutSleepingPageStore } from "@/features/manage-out-sleeping/stores/out-sleeping-page";
import ApplyOutSleeping from "@/features/manage-out-sleeping/ui/ApplyOutSleeping";
import MyOutSleeingList from "@/features/manage-out-sleeping/ui/MyOutSleeingList";
import QueryBoundary from "@/shared/ui/query-boundary";
import { colors } from "@b1nd/dodam-design-system/colors";
import { DoorOpen } from "@b1nd/dodam-design-system/icons";

const ManageOutSleeping = () => {
  const { page } = useOutSleepingPageStore();
  return (
    <div className="small-container flex flex-col gap-4 text-text-primary">
      <header className="flex gap-2 items-center">
        <DoorOpen color={colors.text.primary} />
        <p className="text-headline font-bold">외박</p>
      </header>
      {page === "apply" ? (
        <ApplyOutSleeping/>
      ) : (
        <QueryBoundary pendingFallback={<MyOutSleeingList.Skeleton/>}>
          <MyOutSleeingList/>
        </QueryBoundary>
      )}
    </div>
  );
}

export default ManageOutSleeping
