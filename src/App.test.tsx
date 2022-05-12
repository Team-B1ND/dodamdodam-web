import { render, screen } from "@testing-library/react";
import Root from "./Root";
test("renders learn react link", () => {
  render(<Root />);
  const linkElement = screen.getByText("도담도담");
  expect(linkElement).toBeInTheDocument();
});
