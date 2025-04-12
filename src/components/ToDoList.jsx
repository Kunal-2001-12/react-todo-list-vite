import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <>
      {todos.length === 0 ? (
        <>
          {/* Friendly message */}
          <p className="text-center text-muted">No tasks found.</p>
        </>
      ) : (
        <ul className="list-group">
          {todos.map((task) => (
            <ToDoItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ToDoList;
