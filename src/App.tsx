import { useState } from "react";
import "./App.css"

import type { Assignment } from "@/models/assignment"
import AddAssignmentCard from "./components/AddAssignmentCard";
import AddCourseCard from "./components/AddCourseCard";
import type { Course } from "./models/course";
import CourseCard from "./components/CourseCard";

function App() {
  const [newAssignmentName, setNewAssignmentName] = useState('');
  const [newAssignmentPtsPossible, setNewAssignmentPtsPossible] = useState<number | "">("");
  const [newAssignmentPtsEarned, setNewAssignmentPtsEarned] = useState<number | "">("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<number | "">("");
  
  const addAssignment = () => {
    if (selectedCourseId === "") {
      return;
    }
    if (newAssignmentName.trim() === '') {
      return;
    }
    const newId = Date.now();
    const newAssignmentItem: Assignment = {
      id: newId,
      text: newAssignmentName,
      completed: false,
      pointsPossible: newAssignmentPtsPossible === "" ? 100 : newAssignmentPtsPossible,
      pointsEarned: newAssignmentPtsEarned === "" ? 0 : newAssignmentPtsEarned,
    };
    setCourses(
      courses.map((course) =>
        course.id === selectedCourseId
          ? { ...course, assignments: [...course.assignments, newAssignmentItem] }
          : course
      )
    );
    setNewAssignmentName('');
    setNewAssignmentPtsPossible("");
    setNewAssignmentPtsEarned("");
  };

  const addCourse = () => {
    if (newCourseName.trim() === '') {
      return;
    }
    const newId = Date.now();
    const newCourseItem: Course = {
      id: newId,
      name: newCourseName,
      assignments: [],
    };
    setCourses([...courses, newCourseItem]);
    setNewCourseName('');
  };

  const removeAssignment = (courseId: number, assignmentId: number) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, assignments: course.assignments.filter((assignment) => assignment.id !== assignmentId) }
          : course
      )
    );
  }

  const removeCourse = (id: number) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  }

  const toggleComplete = (courseId: number, assignmentId: number) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignments: course.assignments.map((assignment) =>
                assignment.id === assignmentId ? { ...assignment, completed: !assignment.completed } : assignment
              ),
            }
          : course
      )
    );
  }

  const updateAssignmentText = (courseId: number, assignmentId: number, text: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              assignments: course.assignments.map((assignment) =>
                assignment.id === assignmentId ? { ...assignment, text } : assignment
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
                assignment.id === assignmentId ? { ...assignment, pointsEarned, pointsPossible } : assignment
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
      <AddAssignmentCard
        nameValue={newAssignmentName}
        onNameChange={(e) => setNewAssignmentName(e.target.value)}
        possiblePointsValue={newAssignmentPtsPossible}
        onPossiblePointsChange={(e) =>
          setNewAssignmentPtsPossible(e.target.value === "" ? "" : Number(e.target.value))
        }
        earnedPointsValue={newAssignmentPtsEarned}
        onEarnedPointsChange={(e) =>
          setNewAssignmentPtsEarned(e.target.value === "" ? "" : Number(e.target.value))
        }
        selectedCourseId={selectedCourseId}
        onCourseChange={(value) => setSelectedCourseId(value === "" ? "" : Number(value))}
        courses={courses}
        onAdd={addAssignment}
      />
      {courses.map((course) =>
        <CourseCard
          key={course.id}
          course={course}
          onRemove={removeCourse}
          onRemoveAssignment={removeAssignment}
          onToggleComplete={toggleComplete}
          onUpdateAssignmentPoints={updateAssignmentPoints}
          onUpdateAssignmentText={updateAssignmentText}
        />
      )}
    </div>
  )
}

export default App
