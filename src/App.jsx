import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });

  const [taskInput, setTaskInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskInput.trim(),
      completed: false,
    };
    setTodos([...todos, newTask]);
    setTaskInput('');
  };

  const handleDeleteTask = (id) => {
    setTodos(todos.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditTask = (id, title) => {
    setEditId(id);
    setEditInput(title);
  };

  const saveEditedTask = (id) => {
    setTodos(todos.map(task =>
      task.id === id ? { ...task, title: editInput } : task
    ));
    setEditId(null);
    setEditInput('');
  };

  const filteredTodos = todos
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My To-Do List</h1>

      {/* Task input */}
      <form onSubmit={handleAddTask} className="d-flex gap-2 justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filters */}
      <div className="d-flex justify-content-center mb-4 gap-2">
        <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilter('completed')}>Completed</button>
        <button className={`btn ${filter === 'incomplete' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      {/* Task List */}
      <ul className="list-group">
        {filteredTodos.length === 0 ? (
          <li className="list-group-item text-center">No tasks found.</li>
        ) : (
          filteredTodos.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                {editId === task.id ? (
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span className={task.completed ? 'text-decoration-line-through' : ''}>
                    {task.title}
                  </span>
                )}
              </div>
              <div className="btn-group">
                {editId === task.id ? (
                  <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(task.id)}>Save</button>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => startEditTask(task.id, task.title)}>Edit</button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>×</button>
              </div>
            </li>
          ))
        )}
      </ul>

      <p className="text-end mt-2">{filteredTodos.length} task{filteredTodos.length !== 1 && 's'} found</p>
    </div>
  );
}

export default App;
