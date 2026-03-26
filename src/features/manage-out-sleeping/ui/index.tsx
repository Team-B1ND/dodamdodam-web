import ApplyOutSleeping from "@/features/manage-out-sleeping/ui/ApplyOutSleeping";
import { colors } from "@b1nd/dodam-design-system/colors";
import { DoorOpen } from "@b1nd/dodam-design-system/icons";

const ManageOutSleeping = () => {
  return (
    <div className="small-container flex flex-col gap-4 text-text-primary">
      <header className="flex gap-2 items-center">
        <DoorOpen color={colors.text.primary} />
        <p className="text-headline font-bold">외박</p>
      </header>
      <ApplyOutSleeping/>
    </div>
  );
}

export default ManageOutSleeping