import React from "react";
import { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevent adding empty todos
    onAddTodo(text);
    setText(""); // Clear input after adding
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Enter a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "5px", marginRight: "5px" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;