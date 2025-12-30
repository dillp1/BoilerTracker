import { useState } from "react";
import "./App.css";

import type { Assignment } from "@/models/assignment";
import AddCourseCard from "./components/AddCourseCard";
import type { Course } from "./models/course";
import CourseCard from "./components/CourseCard";
import type { AssignmentType } from "./models/assignmentType";

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourseName, setNewCourseName] = useState("");

  const addAssignment = (
    courseId: number,
    name: string,
    pointsEarned: number | "",
    pointsPossible: number | ""
  ) => {
    if (name.trim() === "") {
      return;
    }
    const course = courses.find((existing) => existing.id === courseId);
    const defaultTypeId = course?.assignmentTypes[0]?.id ?? 0;
    const newId = Date.now();
    const newAssignmentItem: Assignment = {
      id: newId,
      text: name,
      completed: false,
      pointsPossible: pointsPossible === "" ? 100 : pointsPossible,
      pointsEarned: pointsEarned === "" ? 0 : pointsEarned,
      typeId: defaultTypeId,
    };
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignments: [...course.assignments, newAssignmentItem],
            }
          : course
      )
    );
  };

  const addCourse = () => {
    if (newCourseName.trim() === "") {
      return;
    }
    const newId = Date.now();
    const newCourseItem: Course = {
      id: newId,
      name: newCourseName,
      assignments: [],
      assignmentTypes: [],
    };
    setCourses([...courses, newCourseItem]);
    setNewCourseName("");
  };

  const addAssignmentType = (
    courseId: number,
    name: string,
    weight: number | ""
  ) => {
    if (name.trim() === "") {
      return;
    }
    const newId = Date.now();
    const newAssignmentTypeItem: AssignmentType = {
      id: newId,
      name: name,
      weight: weight === "" ? 0 : weight,
    };
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignmentTypes: [
                ...course.assignmentTypes,
                newAssignmentTypeItem,
              ],
            }
          : course
      )
    );
  };

  const removeAssignment = (courseId: number, assignmentId: number) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignments: course.assignments.filter(
                (assignment) => assignment.id !== assignmentId
              ),
            }
          : course
      )
    );
  };

  const removeCourse = (id: number) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const toggleComplete = (courseId: number, assignmentId: number) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignments: course.assignments.map((assignment) =>
                assignment.id === assignmentId
                  ? { ...assignment, completed: !assignment.completed }
                  : assignment
              ),
            }
          : course
      )
    );
  };

  const updateAssignmentText = (
    courseId: number,
    assignmentId: number,
    text: string
  ) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignments: course.assignments.map((assignment) =>
                assignment.id === assignmentId
                  ? { ...assignment, text }
                  : assignment
              ),
            }
          : course
      )
    );
  };

  const updateAssignmentPoints = (
    courseId: number,
    assignmentId: number,
    pointsEarned: number,
    pointsPossible: number
  ) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignments: course.assignments.map((assignment) =>
                assignment.id === assignmentId
                  ? { ...assignment, pointsEarned, pointsPossible }
                  : assignment
              ),
            }
          : course
      )
    );
  };

  return (
    <div className="App">
      <AddCourseCard
        nameValue={newCourseName}
        onNameChange={(e) => setNewCourseName(e.target.value)}
        onAdd={addCourse}
      />
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onRemove={removeCourse}
          onAddAssignment={addAssignment}
          onRemoveAssignment={removeAssignment}
          onToggleComplete={toggleComplete}
          onUpdateAssignmentPoints={updateAssignmentPoints}
          onUpdateAssignmentText={updateAssignmentText}
          onAddAssignmentType={addAssignmentType}
        />
      ))}
    </div>
  );
}

export default App;
