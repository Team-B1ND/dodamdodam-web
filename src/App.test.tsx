import { render, screen } from "@testing-library/react";
import Root from "./Root";
test("renders learn react link", () => {
  render(<Root />);
  // const linkElement = screen.getByText("오늘의 일정");
  // expect(linkElement).toBeInTheDocument();
});
