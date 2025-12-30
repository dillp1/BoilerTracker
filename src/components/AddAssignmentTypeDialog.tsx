import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type AddAssignmentTypeDialogProps = {
  courseName?: string;
  courseId: number;
  onAddAssignmentType: (
    courseId: number,
    name: string,
    weight: number | ""
  ) => void;
};

const AddAssignmentTypeDialog = ({
  courseName,
  courseId,
  onAddAssignmentType,
}: AddAssignmentTypeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || weight === "") return;
    onAddAssignmentType(courseId, name, weight);
    setName("");
    setWeight("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add assignment type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a new assignment type</DialogTitle>
            <DialogDescription>
              {courseName
                ? `Add a new assignment type to ${courseName}`
                : "Add a new assignment type to the course"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Homework"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="weight-1">Weight</Label>
              <Input
                id="weight-1"
                name="weight"
                placeholder="ex. 10"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value === "" ? "" : Number(e.target.value))
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add type</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentTypeDialog;
