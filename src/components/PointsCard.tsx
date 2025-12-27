import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Assignment } from "@/models/assignment";
import PointsRadial from "./PointsRadial";

type PointsCardProps = {
  assignments: Assignment[];
};

const PointsCard = ({ assignments }: PointsCardProps) => {
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsCard;
