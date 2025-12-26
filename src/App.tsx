import { useState } from "react";
import "./App.css"

import type { Assignment } from "@/models/assignment"
import AddAssignmentCard from "./components/AddAssignmentCard";
import AssignmentsCard from "./components/AssignmentsCard";

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState('');

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

  const toggleComplete = (id: number) => {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === id) {
        return { ...assignment, completed: !assignment.completed }
      }
      return assignment;
    });
    setAssignments(updatedAssignments);
  }

  const updateAssignmentText = (id: number, text: string) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, text } : assignment
    );
    setAssignments(updatedAssignments);
  };

  return (
    <div className="App">
      <AddAssignmentCard
        value={newAssignment}
        onChange={(e) => setNewAssignment(e.target.value)}
        onAdd={addAssignment}
      />
      <AssignmentsCard
        assignments={assignments}
        onRemove={removeAssignment}
        onToggleComplete={toggleComplete}
        onUpdateText={updateAssignmentText}
      />
    </div>
  )
}

export default App
