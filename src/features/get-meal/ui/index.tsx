import { mealTypeToText } from "@/features/get-meal/lib/meal-type-to-text"
import useGetMealByDate from "@/features/get-meal/model/useGetMealByDate"
import { formatDate } from "@/shared/libs/formatDate"
import { colors } from "@b1nd/dodam-design-system/colors"
import { DatePicker, FilledButton, PickerTrigger, Tag } from "@b1nd/dodam-design-system/components"
import { ForkAndKnife } from "@b1nd/dodam-design-system/icons"
import { useState } from "react"

const Meal = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data } = useGetMealByDate(formatDate(selectedDate));
  
  return (
    <div className="small-container flex flex-col gap-4 text-text-primary">
      <header className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <ForkAndKnife color={colors.text.primary} />
          <p className="text-headline font-bold">급식</p>
        </div>
        <PickerTrigger
          content={({ onClose }) => (
            <DatePicker.Content
              date={selectedDate}
              onChangeDate={setSelectedDate}
              onClose={onClose}
            />
          )}
        >
          <FilledButton
            size="small"
          >
            {formatDate(selectedDate)}
          </FilledButton>
        </PickerTrigger>
      </header>
      {data.map((item) => (
        <div
          key={`${item.date}_${item.mealType}`}
          className="flex flex-col gap-1 items-start"
        >
          <Tag text={mealTypeToText(item.mealType)} color="blue" />
          <p className="text-body2 font-medium">{item.menus.join(", ")}</p>
          <span className="text-label text-text-tertiary font-medium">
            {`${item.calorie}Kcal`}
          </span>
        </div>
      ))}
    </div>
  );
}

Meal.Skeleton = () => {
  return (
    <div className="small-container flex flex-col gap-4 text-text-primary">
      <header className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <ForkAndKnife color={colors.text.primary} />
          <p className="text-headline font-bold">급식</p>
        </div>
        <FilledButton size="small" className="skeleton">
          로딩 중
        </FilledButton>
      </header>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-1 items-start">
          <div className="w-12 h-8 rounded-full skeleton" />
          <div className="w-full h-4 rounded-extrasmall skeleton" />
          <div className="w-full h-4 rounded-extrasmall skeleton" />
          <div className="w-20 h-4 rounded-extrasmall skeleton" />
        </div>
      ))}
    </div>
  );
}

export default Meal