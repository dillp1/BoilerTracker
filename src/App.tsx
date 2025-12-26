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

import { PenLine } from "lucide-react"

type Assignment = {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState('');

  const addAssignment = () => {
    if (newAssignment !== '') {
      const newId = Date.now();
      const newAssignmentItem: Assignment = {
        id: newId,
        text: newAssignment,
        completed: false,
      };
      setAssignments([...assignments, newAssignmentItem])
      setNewAssignment('');
    }
  };

  const removeAssignment = (id: number) => {
    const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
    setAssignments(updatedAssignments);
  }

  const toggleComplete = (id: number) => {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === id) {
        return { ...assignment, completed: !assignment.completed }
      }
      return assignment;
    });
    setAssignments(updatedAssignments);
  }

  return (
    <div className="App">
      <Card>
        <CardHeader>
          <CardTitle>Add an Assignment</CardTitle>
          <CardDescription>Add a new assignment to the list</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type='text' placeholder='Assignment name' value={newAssignment} onChange={(e) => setNewAssignment(e.target.value)}></Input>
        </CardContent>
        <CardFooter className="flex-col">
          <Button type='submit' className='w-full' onClick={addAssignment}>
            Add Assignment
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Assignment List</CardTitle>
          <CardDescription>Here are your assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment.id}>
                <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50">
                  <input
                    type='checkbox'
                    checked={assignment.completed}
                    onChange={() => toggleComplete(assignment.id)}
                    className="h-4 w-4 accent-slate-700"
                  />
                  <span className={assignment.completed ? "text-slate-400 line-through" : "text-slate-800"}>
                    {assignment.text}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                    >
                      <PenLine />
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAssignment(assignment.id)}
                    >
                      Remove
                    </Button>
                  </div>
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
