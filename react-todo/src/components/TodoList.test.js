import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList"; // Adjust path if needed

const sampleTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build a Todo App", completed: false },
];

describe("TodoList Component", () => {
  test("renders todo items", () => {
    render(<TodoList />);
    
    sampleTodos.forEach(todo => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText("Enter a new todo...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles todo completion", async () => {
    render(<TodoList />);
    
    const todoText = screen.getByText("Learn React");
    const todoItem = todoText.closest("li"); // Get the parent <li>
  
    // Initially, it should NOT have line-through
    expect(todoItem).not.toHaveStyle("text-decoration: line-through");
  
    // Click to toggle completion
    fireEvent.click(todoText);
  
    // Wait for the style to update
    await waitFor(() => {
      expect(todoItem).toHaveStyle("text-decoration: line-through");
    });
  
    // Click again to toggle back
    fireEvent.click(todoText);
  
    await waitFor(() => {
      expect(todoItem).not.toHaveStyle("text-decoration: line-through");
    });
  });
  

  test("deletes a todo", () => {
    render(<TodoList />);
    
    const todoItem = screen.getByText("Build a Todo App");
    const deleteButton = screen.getByTestId("delete-2");

    fireEvent.click(deleteButton);

    expect(todoItem).not.toBeInTheDocument();
  });
});