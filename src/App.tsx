import { useState } from "react";
import "./App.css"

import type { Assignment } from "@/models/assignment"
import AddAssignmentCard from "./components/AddAssignmentCard";
import AssignmentsCard from "./components/AssignmentsCard";

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignmentName, setNewAssignmentName] = useState('');
  const [newAssignmentPtsPossible, setNewAssignmentPtsPossible] = useState<number | "">("");
  const [newAssignmentPtsEarned, setNewAssignmentPtsEarned] = useState<number | "">("");
  
  const addAssignment = () => {
    if (newAssignmentName.trim() === '') {
      return;
    }
    const newId = Date.now();
    const newAssignmentItem: Assignment = {
      id: newId,
      text: newAssignmentName,
      completed: false,
      pointsPossible: newAssignmentPtsPossible === "" ? 100 : newAssignmentPtsPossible,
      pointsEarned: newAssignmentPtsEarned === "" ? 0 : newAssignmentPtsEarned,
    };
    setAssignments([...assignments, newAssignmentItem])
    setNewAssignmentName('');
    setNewAssignmentPtsPossible("");
    setNewAssignmentPtsEarned("");
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

  const updateAssignmentPoints = (id: number, pointsEarned: number, pointsPossible: number) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, pointsEarned, pointsPossible } : assignment
    );
    setAssignments(updatedAssignments);
  };

  return (
    <div className="App">
      <AddAssignmentCard
        nameValue={newAssignmentName}
        onNameChange={(e) => setNewAssignmentName(e.target.value)}
        possiblePointsValue={newAssignmentPtsPossible}
        onPossiblePointsChange={(e) =>
          setNewAssignmentPtsPossible(e.target.value === "" ? "" : Number(e.target.value))
        }
        earnedPointsValue={newAssignmentPtsEarned}
        onEarnedPointsChange={(e) =>
          setNewAssignmentPtsEarned(e.target.value === "" ? "" : Number(e.target.value))
        }
        onAdd={addAssignment}
      />
      <AssignmentsCard
        assignments={assignments}
        onRemove={removeAssignment}
        onToggleComplete={toggleComplete}
        onUpdateText={updateAssignmentText}
        onUpdatePoints={updateAssignmentPoints}
      />
    </div>
  )
}

export default App
