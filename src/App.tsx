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
    <div className="App">
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
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>Here are your Todos</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50">
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="h-4 w-4 accent-slate-700"
                  />
                  <span className={todo.completed ? "text-slate-400 line-through" : "text-slate-800"}>
                    {todo.text}
                  </span>
                  <Button
                    type="submit"
                    onClick={() => removeTodo(todo.id)}
                    className="ml-auto"
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
            </ul>
          </CardContent>
        </Card>
    </div>
  )
}

export default App
