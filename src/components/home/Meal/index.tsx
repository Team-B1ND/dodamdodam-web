import MealDatePicker from "./MealDatePicker";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import MealList from "./MealList";
import styled from "styled-components";
import { Flex } from "@src/style/flex";

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

const MealContainer = styled.div`
  width: 505px;
  height: 326px;

  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};

  ${Flex({ $flexDirection: "column", $alignItems: "center" })}
`;
