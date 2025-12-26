import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input"
import "./App.css"

import { PenLine } from "lucide-react"
import type { Assignment } from "@/models/assignment"
import AddAssignmentCard from "./components/AddAssignmentCard";

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const addAssignment = () => {
    if (newAssignment.trim() === '') {
      return;
    }
    const newId = Date.now();
    const newAssignmentItem: Assignment = {
      id: newId,
      text: newAssignment,
      completed: false,
    };
    setAssignments([...assignments, newAssignmentItem])
    setNewAssignment('');
  };

  const removeAssignment = (id: number) => {
    const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
    setAssignments(updatedAssignments);
  }

  const startEdit = (assignment: Assignment) => {
    setEditingId(assignment.id);
    setEditingText(assignment.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = (id: number) => {
    if (editingText.trim() === '') {
      return;
    }
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, text: editingText } : assignment
    );
    setAssignments(updatedAssignments);
    cancelEdit();
  };

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
      <AddAssignmentCard
        value={newAssignment}
        onChange={(e) => setNewAssignment(e.target.value)}
        onAdd={addAssignment}
      />
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
                  {editingId === assignment.id ? (
                    <Input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className={assignment.completed ? "text-slate-400 line-through" : "text-slate-800"}>
                      {assignment.text}
                    </span>
                  )}
                  <div className="ml-auto flex items-center gap-2">
                    {editingId === assignment.id ? (
                      <>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => saveEdit(assignment.id)}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => startEdit(assignment)}
                      >
                        <PenLine />
                      </Button>
                    )}
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
