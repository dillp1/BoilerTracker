import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label"

type AddAssignmentCardProps = {
  nameValue: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pointsValue: number;
  onPointsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

const AddAssignmentCard = ({ nameValue, onNameChange, pointsValue, onPointsChange, onAdd }: AddAssignmentCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add an Assignment</CardTitle>
          <CardDescription>Add a new assignment to the list</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label>Assignment Name</Label>
          <Input
            type="text"
            placeholder="Homework 1"
            value={nameValue}
            onChange={onNameChange}
          ></Input>
          <Label>Points Possible</Label>
          <Input
            type="number"
            value={pointsValue}
            onChange={onPointsChange}
          ></Input>
        </CardContent>
        <CardFooter className="flex-col">
          <Button type="button" className="w-full" onClick={onAdd}>
            Add Assignment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddAssignmentCard;
