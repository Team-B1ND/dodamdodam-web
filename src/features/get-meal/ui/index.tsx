import { mealTypeToText } from "@/features/get-meal/lib/meal-type-to-text"
import useGetMealByDate from "@/features/get-meal/model/useGetMealByDate"
import { getToday } from "@/shared/libs/day"
import { colors } from "@b1nd/dodam-design-system/colors"
import { Tag } from "@b1nd/dodam-design-system/components"
import { ForkAndKnife } from "@b1nd/dodam-design-system/icons"

const Meal = () => {
  const today = getToday();
  const { data } = useGetMealByDate(today);
  
  return (
    <div className="small-container flex flex-col gap-4 text-text-primary">
      <header className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <ForkAndKnife color={colors.text.primary} />
          <p className="text-headline font-bold">급식</p>
        </div>
      </header>
      {data.map(item => (
        <div key={`${item.date}_${item.mealType}`} className="flex flex-col gap-1 items-start">
          <Tag text={mealTypeToText(item.mealType)} color="blue" />
          <p className="text-body2 font-medium">
            {item.menus.join(", ")}
          </p>
          <span className="text-label text-text-tertiary font-medium">
            {`${item.calorie}Kcal`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Meal