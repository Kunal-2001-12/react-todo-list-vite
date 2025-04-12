import React, { useState } from 'react';

function ToDoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleDoubleClick = () => {
    setIsEditing(true); // Enable editing mode on double-click
  };

  const handleBlur = () => {
    setIsEditing(false); // Exit editing mode when input loses focus
    onEdit(task.id, editedText.trim() !== '' ? editedText : task.text); // Save changes
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false); // Exit editing mode on Enter key
      onEdit(task.id, editedText.trim() !== '' ? editedText : task.text); // Save changes
    } else if (e.key === 'Escape') {
      setIsEditing(false); // Exit editing mode on Escape key without saving
      setEditedText(task.text); // Revert to original text
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {/* Checkbox to toggle task completion */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="me-2"
        />

        {/* Render input box or task text */}
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleBlur} // Save changes on blur
            onKeyDown={handleKeyDown} // Handle Enter and Escape keys
            className="form-control"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick} // Enable editing on double-click
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Delete button */}
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onDelete(task.id)}
      >
        &times;
      </button>
    </li>
  );
}

export default ToDoItem;
