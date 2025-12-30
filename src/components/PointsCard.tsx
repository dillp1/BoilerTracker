import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Assignment } from "@/models/assignment";
import PointsRadial from "./PointsRadial";
import AddAssignmentTypeDialog from "./AddAssignmentTypeDialog";
import type { AssignmentType } from "@/models/assignmentType";

type PointsCardProps = {
  courseName?: string;
  courseId: number;
  assignments: Assignment[];
  assignmentTypes: AssignmentType[];
  onAddAssignmentType: (
    courseId: number,
    name: string,
    weight: number | ""
  ) => void;
};

const PointsCard = ({
  courseName,
  courseId,
  assignments,
  assignmentTypes,
  onAddAssignmentType,
}: PointsCardProps) => {
  const totals = assignments.reduce(
    (acc, a) => ({
      earned: acc.earned + a.pointsEarned,
      possible: acc.possible + a.pointsPossible,
    }),
    { earned: 0, possible: 0 }
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Points Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <PointsRadial
            ptsEarned={totals.earned}
            ptsPossible={totals.possible}
          />
          <AddAssignmentTypeDialog
            courseName={courseName}
            courseId={courseId}
            onAddAssignmentType={onAddAssignmentType}
          />
          <ul>
            {assignmentTypes.map((assignmentType) => (
              <div>
                <span>
                  {assignmentType.name} {assignmentType.weight}
                </span>
              </div>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsCard;
