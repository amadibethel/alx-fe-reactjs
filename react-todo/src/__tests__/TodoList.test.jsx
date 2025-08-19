import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  test("renders heading correctly", () => {
    render(<TodoList />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  test("adds a new todo item when button is clicked", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Enter a todo");
    const button = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(button);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });

  test("clears input after adding a todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Enter a todo");
    const button = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "Write tests" } });
    fireEvent.click(button);

    expect(input.value).toBe("");
  });

  test("does not add empty todo", () => {
    render(<TodoList />);
    const button = screen.getByText("Add Todo");
    fireEvent.click(button);

    expect(screen.queryByTestId("todo-item")).toBeNull();
  });
});
