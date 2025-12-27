import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label"
import type { Course } from "@/models/course";

type AddAssignmentCardProps = {
  nameValue: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  possiblePointsValue: number | "";
  onPossiblePointsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  earnedPointsValue: number | "";
  onEarnedPointsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCourseId: number | "";
  onCourseChange: (value: string) => void;
  courses: Course[];
  onAdd: () => void;
};

const AddAssignmentCard = ({
  nameValue,
  onNameChange,
  possiblePointsValue,
  onPossiblePointsChange,
  earnedPointsValue,
  onEarnedPointsChange,
  selectedCourseId,
  onCourseChange,
  courses,
  onAdd
}: AddAssignmentCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add an Assignment</CardTitle>
          <CardDescription>Add a new assignment to the list</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label>
            Assignment Name
          </Label>
          <Input
            type="text"
            placeholder="Homework 1"
            value={nameValue}
            onChange={onNameChange}
          ></Input>
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <div className="flex flex-col gap-1">
              <Label>
                Points Earned
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={earnedPointsValue}
                onChange={onEarnedPointsChange}
              ></Input>
            </div>
            <div className="pb-2 text-lg font-semibold">/</div>
            <div className="flex flex-col gap-1">
              <Label>
                Points Possible
              </Label>
              <Input
                type="number"
                placeholder="100"
                value={possiblePointsValue}
                onChange={onPossiblePointsChange}
              ></Input>
            </div>
          </div>
          <Label>
            Select a course
          </Label>
          <Select
            value={selectedCourseId === "" ? "" : String(selectedCourseId)}
            onValueChange={onCourseChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Courses</SelectLabel>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={String(course.id)}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="flex-col">
          <Button type="button" className="w-full" onClick={onAdd} disabled={selectedCourseId === ""}>
            Add Assignment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddAssignmentCard;
