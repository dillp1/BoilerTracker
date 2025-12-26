import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Course } from "@/models/course";
import { Button } from "./ui/button";

type CourseCardProps = {
  course: Course;
  onRemove: (id: number) => void;
};

const CourseCard = ({ course, onRemove }: CourseCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{course.name}</CardTitle>
          <CardDescription>{course.assignments.length} Assignments</CardDescription>
          <CardAction>
            <Button variant="destructive" onClick={() => onRemove(course.id)}>Remove</Button>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}

export default CourseCard
