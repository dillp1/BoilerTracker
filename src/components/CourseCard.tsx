import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/models/course";
import { Button } from "./ui/button";
import AssignmentsCard from "./AssignmentsCard";
import PointsCard from "./PointsCard";

type CourseCardProps = {
  course: Course;
  onRemove: (id: number) => void;
  onAddAssignment: (
    courseId: number,
    name: string,
    pointsEarned: number | "",
    pointsPossible: number | ""
  ) => void;
  onRemoveAssignment: (courseId: number, assignmentId: number) => void;
  onToggleComplete: (courseId: number, assignmentId: number) => void;
  onUpdateAssignmentText: (
    courseId: number,
    assignmentId: number,
    text: string
  ) => void;
  onUpdateAssignmentPoints: (
    courseId: number,
    assignmentId: number,
    earned: number,
    possible: number
  ) => void;
};

const CourseCard = ({
  course,
  onRemove,
  onAddAssignment,
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
          <CardDescription>
            {course.assignments.length} Assignments
          </CardDescription>
          <CardAction>
            <Button variant="destructive" onClick={() => onRemove(course.id)}>
              Remove
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex gap-flex flex-col gap-3">
            <PointsCard assignments={course.assignments} />
            <AssignmentsCard
              courseId={course.id}
              courseName={course.name}
              assignments={course.assignments}
              onAddAssignment={onAddAssignment}
              onRemove={(assignmentId) =>
                onRemoveAssignment(course.id, assignmentId)
              }
              onToggleComplete={(assignmentId) =>
                onToggleComplete(course.id, assignmentId)
              }
              onUpdateText={(assignmentId, text) =>
                onUpdateAssignmentText(course.id, assignmentId, text)
              }
              onUpdatePoints={(assignmentId, earned, possible) =>
                onUpdateAssignmentPoints(
                  course.id,
                  assignmentId,
                  earned,
                  possible
                )
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCard;
