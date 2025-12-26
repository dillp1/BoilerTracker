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

type AddCourseCardProps = {
  nameValue: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

const AddCourseCard = ({ nameValue, onNameChange, onAdd }: AddCourseCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add a Course</CardTitle>
          <CardDescription>Add a new course to the list</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label>
            Course Name
          </Label>
          <Input
            type="text"
            placeholder="BoilerTracker 101"
            value={nameValue}
            onChange={onNameChange}
          ></Input>
        </CardContent>
        <CardFooter className="flex-col">
          <Button type="button" className="w-full" onClick={onAdd}>
            Add Course
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCourseCard;
