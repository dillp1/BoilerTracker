import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Course } from "@/models/course";
import { Button } from "./ui/button";
import AssignmentsCard from "./AssignmentsCard";

type CourseCardProps = {
  course: Course;
  onRemove: (id: number) => void;
  onRemoveAssignment: (courseId: number, assignmentId: number) => void;
  onToggleComplete: (courseId: number, assignmentId: number) => void;
  onUpdateAssignmentText: (courseId: number, assignmentId: number, text: string) => void;
  onUpdateAssignmentPoints: (courseId: number, assignmentId: number, earned: number, possible: number) => void;
};

const CourseCard = ({
  course,
  onRemove,
  onRemoveAssignment,
  onToggleComplete,
  onUpdateAssignmentText,
  onUpdateAssignmentPoints,
}: CourseCardProps) => {
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
        <CardContent>
          <AssignmentsCard
            assignments={course.assignments}
            onRemove={(assignmentId) => onRemoveAssignment(course.id, assignmentId)}
            onToggleComplete={(assignmentId) => onToggleComplete(course.id, assignmentId)}
            onUpdateText={(assignmentId, text) => onUpdateAssignmentText(course.id, assignmentId, text)}
            onUpdatePoints={(assignmentId, earned, possible) =>
              onUpdateAssignmentPoints(course.id, assignmentId, earned, possible)
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseCard
