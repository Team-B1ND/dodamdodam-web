import MealDatePicker from "./MealDatePicker";
import { MealContainer } from "./style";

import ErrorBoundary from "../../../components/common/ErrorBoundary";
import { Suspense } from "react";
import MealList from "./MealList";

const Meal = () => {
  return (
    <MealContainer>
      <MealDatePicker />
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중...</>}>
          <MealList />
        </Suspense>
      </ErrorBoundary>
    </MealContainer>
  );
};

export default Meal;
