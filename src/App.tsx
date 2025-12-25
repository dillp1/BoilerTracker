import { useState } from "react";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo !== '') {
      const newId = Date.now();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem])
      setNewTodo('');
    }
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div>
      <h1>Todo App</h1>
      <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo} >Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type='checkbox' checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
