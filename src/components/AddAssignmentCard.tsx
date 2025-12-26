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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

const AddAssignmentCard = ({ value, onChange, onAdd }: AddAssignmentCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add an Assignment</CardTitle>
          <CardDescription>Add a new assignment to the list</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Assignment name"
            value={value}
            onChange={onChange}
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
