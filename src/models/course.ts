import type { Assignment } from "./assignment";
import type { AssignmentType } from "./assignmentType";

export type Course = {
  id: number;
  name: string;
  assignments: Assignment[];
  assignmentTypes: AssignmentType[];
}
