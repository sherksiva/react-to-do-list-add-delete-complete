import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
   const [todos, setTodos] = useState(() => {
    // Initialize todos from local storage or an empty array
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  // For Every ToDo Change it will set in localstorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', 
    margin: '20px auto', 
    padding: '20px', 
    border: '1px solid #ccc', 
    borderRadius: '8px' }}>
      <h1>Todo List</h1>
      <form onSubmit={addTodo} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add
        </button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #eee',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#333',
            }}
          >
            <span className="normal_text">
              <span>{todo.text}</span> <span className="date-align">{new Date(todo.id).toLocaleString()}</span>
            </span>
           { !todo.completed && <button title="Delete the task"
              onClick={() => deleteTodo(todo.id)}
              style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2em' }}
            >
              &times;
            </button>}
            <button title="Complete the task" disabled={todo.completed} onClick={() => toggleTodo(todo.id)}
              style={{ cursor: todo.completed ? 'not-allowed':'pointer',background: 'none', border: 'none', color: 'blue', fontSize: '1.2em' }}
             >&#10004;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
