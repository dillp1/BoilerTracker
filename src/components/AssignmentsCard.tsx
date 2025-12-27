import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { PenLine, Plus } from "lucide-react"
import type { Assignment } from "@/models/assignment";
import { Button } from "./ui/button";
import AddAssignmentCard from "./AddAssignmentCard";

type AssignmentsCardProps = {
  courseId: number;
  courseName?: string;
  assignments: Assignment[];
  onAddAssignment: (
    courseId: number,
    name: string,
    pointsEarned: number | "",
    pointsPossible: number | ""
  ) => void;
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onUpdateText: (id: number, text: string) => void;
  onUpdatePoints: (id: number, earned: number, possible: number) => void;
};

const AssignmentsCard = ({
  courseId,
  courseName,
  assignments,
  onAddAssignment,
  onRemove,
  onToggleComplete,
  onUpdateText,
  onUpdatePoints,
}: AssignmentsCardProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingPtsEarned, setEditingPtsEarned] = useState<number | "">("");
  const [editingPtsPossible, setEditingPtsPossible] = useState<number | "">("");

  const [newAssignmentName, setNewAssignmentName] = useState('');
  const [newAssignmentPtsPossible, setNewAssignmentPtsPossible] = useState<number | "">("");
  const [newAssignmentPtsEarned, setNewAssignmentPtsEarned] = useState<number | "">("");
  const handleAddAssignment = () => {
    if (newAssignmentName.trim() === '') {
      return;
    }
    onAddAssignment(courseId, newAssignmentName, newAssignmentPtsEarned, newAssignmentPtsPossible);
    setNewAssignmentName('');
    setNewAssignmentPtsPossible("");
    setNewAssignmentPtsEarned("");
    setIsAddOpen(false);
  };


  const startEdit = (assignment: Assignment) => {
    setEditingId(assignment.id);
    setEditingText(assignment.text);
    setEditingPtsEarned(assignment.pointsEarned);
    setEditingPtsPossible(assignment.pointsPossible);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
    setEditingPtsEarned("");
    setEditingPtsPossible("");
  };

  const saveEdit = (id: number) => {
    if (editingText.trim() === '') {
      return;
    }
    onUpdateText(id, editingText);
    onUpdatePoints(
      id,
      editingPtsEarned === "" ? 0 : editingPtsEarned,
      editingPtsPossible === "" ? 0 : editingPtsPossible
    );
    cancelEdit();
  };
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Assignment List</CardTitle>
          <CardDescription>Here are your assignments</CardDescription>
          <CardAction>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an assignment</DialogTitle>
                  <DialogDescription>
                    {courseName ? `Add a new assignment to ${courseName}.` : "Add a new assignment to this course."}
                  </DialogDescription>
                </DialogHeader>
                <AddAssignmentCard
                  courseName={courseName}
                  showHeader={false}
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
                  onAdd={handleAddAssignment}
                />
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment.id}>
                <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50">
                  <input
                    type='checkbox'
                    checked={assignment.completed}
                    onChange={() => onToggleComplete(assignment.id)}
                    className="h-4 w-4 accent-slate-700"
                  />
                  {editingId === assignment.id ? (
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="h-8"
                      />
                      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
                        <Input
                          type="number"
                          value={editingPtsEarned}
                          onChange={(e) =>
                            setEditingPtsEarned(e.target.value === "" ? "" : Number(e.target.value))
                          }
                          className="h-7 w-20 border-slate-200 bg-white"
                        />
                        <span className="text-sm font-semibold text-slate-400">/</span>
                        <Input
                          type="number"
                          value={editingPtsPossible}
                          onChange={(e) =>
                            setEditingPtsPossible(e.target.value === "" ? "" : Number(e.target.value))
                          }
                          className="h-7 w-20 border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <span className={assignment.completed ? "text-slate-400 line-through" : "text-slate-800"}>
                        {assignment.text}
                      </span>
                      <span className="ml-auto text-xs text-slate-500">
                        {assignment.pointsEarned} / {assignment.pointsPossible} pts
                      </span>
                    </div>
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
                      onClick={() => onRemove(assignment.id)}
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

export default AssignmentsCard
