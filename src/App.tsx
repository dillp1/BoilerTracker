import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input"
import "./App.css"

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
    <div className="app">
      <Card>
        <CardHeader>
          <CardTitle>Add a Todo</CardTitle>
          <CardDescription>Add a new todo to the list</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type='text' placeholder='todo...' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></Input>
        </CardContent>
        <CardFooter className="flex-col">
          <Button type='submit' className='w-full' onClick={addTodo}>
            Add Todo
          </Button>
        </CardFooter>
      </Card>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type='checkbox' checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button>Remove</button>
            <Button
              type="submit"
              onClick={() => removeTodo(todo.id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
