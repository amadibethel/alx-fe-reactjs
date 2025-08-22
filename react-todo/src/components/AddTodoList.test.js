
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "../components/AddTodoForm"; // Adjust the path if necessary

describe("AddTodoForm Component", () => {
  test("renders input field and add button", () => {
    render(<AddTodoForm onAddTodo={jest.fn()} />);

    const input = screen.getByPlaceholderText("Enter a new todo...");
    const addButton = screen.getByText("Add");

    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("allows user to type in the input field", () => {
    render(<AddTodoForm onAddTodo={jest.fn()} />);

    const input = screen.getByPlaceholderText("Enter a new todo...");
    
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input.value).toBe("New Task");
  });

  test("calls onAddTodo when a new todo is added", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("Enter a new todo...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith("New Task");

    // Ensure the input field clears after submission
    expect(input.value).toBe("");
  });

  test("prevents adding an empty todo", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const addButton = screen.getByText("Add");

    fireEvent.click(addButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});
