import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { PenLine } from "lucide-react"
import type { Assignment } from "@/models/assignment";
import { Button } from "./ui/button";

type AssignmentsCardProps = {
  assignments: Assignment[];
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onUpdateText: (id: number, text: string) => void;
};

const AssignmentsCard = ({
  assignments,
  onRemove,
  onToggleComplete,
  onUpdateText,
}: AssignmentsCardProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

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
    onUpdateText(id, editingText);
    cancelEdit();
  };
  
  return (
    <div>
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
                    onChange={() => onToggleComplete(assignment.id)}
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
                    <div className="flex items-center gap-2 flex-1">
                      <span className={assignment.completed ? "text-slate-400 line-through" : "text-slate-800"}>
                        {assignment.text}
                      </span>
                      <span className="ml-auto text-xs text-slate-500">
                        {assignment.pointsPossible} pts
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
