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
          <Input
            type="text"
            placeholder="Assignment name"
            value={nameValue}
            onChange={onNameChange}
          ></Input>
          <Input
            type="number"
            placeholder="Pts possible"
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
