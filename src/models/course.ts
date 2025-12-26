import type { Assignment } from "./assignment";

export type Course = {
  id: number;
  name: string;
  assignments: Assignment[];
}
