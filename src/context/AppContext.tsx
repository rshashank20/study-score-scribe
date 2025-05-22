
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Branch, Course, Grade, Semester, SemesterResult } from '../types';
import { calculateSGPA, calculateCGPA, generateSampleCourses } from '../utils/gpaCalculator';
import { useToast } from '@/components/ui/use-toast';

// Sample data
const branches: Branch[] = [
  { id: 'cse', name: 'Computer Science Engineering' },
  { id: 'ece', name: 'Electronics & Communication Engineering' },
  { id: 'me', name: 'Mechanical Engineering' },
  { id: 'ce', name: 'Civil Engineering' },
  { id: 'ee', name: 'Electrical Engineering' },
  { id: 'iem', name: 'Industrial Engineering and Management' },
];

const semesters: Semester[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Semester ${i + 1}`,
}));

// Context type
type AppContextType = {
  branches: Branch[];
  semesters: Semester[];
  selectedBranch: Branch | null;
  selectedSemester: Semester | null;
  courses: Course[];
  semesterResults: SemesterResult[];
  setSelectedBranch: (branch: Branch) => void;
  setSelectedSemester: (semester: Semester) => void;
  setCourses: (courses: Course[]) => void;
  updateCourseGrade: (courseId: string, grade: Grade) => void;
  addCustomCourse: (name: string, credits: number) => void;
  calculateAndSaveSemester: () => void;
  removeCourse: (courseId: string) => void;
  resetCurrentSelection: () => void;
  updateSemesterResult: (semesterId: number, sgpa: number, totalCredits: number) => void;
  removeSemesterResult: (semesterId: number) => void;
  calculateCGPA: () => number;
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedBranch, setSelectedBranchState] = useState<Branch | null>(null);
  const [selectedSemester, setSelectedSemesterState] = useState<Semester | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [semesterResults, setSemesterResults] = useState<SemesterResult[]>([]);
  const { toast } = useToast();

  const setSelectedBranch = (branch: Branch) => {
    setSelectedBranchState(branch);
    if (selectedSemester) {
      const newCourses = generateSampleCourses(branch.id, selectedSemester.id);
      setCourses(newCourses);
    }
  };

  const setSelectedSemester = (semester: Semester) => {
    setSelectedSemesterState(semester);
    if (selectedBranch) {
      const newCourses = generateSampleCourses(selectedBranch.id, semester.id);
      setCourses(newCourses);
    }
  };

  const updateCourseGrade = (courseId: string, grade: Grade) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, grade } : course
      )
    );
  };

  const addCustomCourse = (name: string, credits: number) => {
    const newCourse: Course = {
      id: `custom-${Date.now()}`,
      code: `CUST${courses.length + 1}`,
      name,
      credits,
      grade: undefined
    };
    setCourses(prevCourses => [...prevCourses, newCourse]);
    toast({
      title: "Course added",
      description: `${name} has been added to your courses.`,
    });
  };

  const calculateAndSaveSemester = () => {
    if (!selectedSemester) return;

    // Check if all courses have grades
    const allGraded = courses.every(course => course.grade);
    if (!allGraded) {
      toast({
        title: "Missing grades",
        description: "Please assign grades to all courses before calculating SGPA.",
        variant: "destructive",
      });
      return;
    }

    const sgpa = calculateSGPA(courses);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    
    const newResult: SemesterResult = {
      semesterId: selectedSemester.id,
      semesterName: selectedSemester.name,
      sgpa,
      totalCredits,
      courses: [...courses]
    };

    // Check if we're updating an existing semester or adding a new one
    const existingIndex = semesterResults.findIndex(sr => sr.semesterId === selectedSemester.id);
    
    if (existingIndex >= 0) {
      setSemesterResults(prev => [
        ...prev.slice(0, existingIndex),
        newResult,
        ...prev.slice(existingIndex + 1)
      ]);
      toast({
        title: "Semester updated",
        description: `${selectedSemester.name} has been updated with SGPA: ${sgpa}`,
      });
    } else {
      setSemesterResults(prev => [...prev, newResult]);
      toast({
        title: "Semester saved",
        description: `${selectedSemester.name} has been saved with SGPA: ${sgpa}`,
      });
    }
  };

  const removeCourse = (courseId: string) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    toast({
      title: "Course removed",
      description: "The course has been removed from the list.",
    });
  };

  const resetCurrentSelection = () => {
    setSelectedBranchState(null);
    setSelectedSemesterState(null);
    setCourses([]);
  };

  const updateSemesterResult = (semesterId: number, sgpa: number, totalCredits: number) => {
    setSemesterResults(prev => 
      prev.map(sr => 
        sr.semesterId === semesterId 
          ? { ...sr, sgpa, totalCredits } 
          : sr
      )
    );
  };

  const removeSemesterResult = (semesterId: number) => {
    setSemesterResults(prev => prev.filter(sr => sr.semesterId !== semesterId));
    toast({
      title: "Semester removed",
      description: "The semester has been removed from your results.",
    });
  };

  const calculateCGPAValue = () => {
    return calculateCGPA(semesterResults);
  };

  return (
    <AppContext.Provider
      value={{
        branches,
        semesters,
        selectedBranch,
        selectedSemester,
        courses,
        semesterResults,
        setSelectedBranch,
        setSelectedSemester,
        setCourses,
        updateCourseGrade,
        addCustomCourse,
        calculateAndSaveSemester,
        removeCourse,
        resetCurrentSelection,
        updateSemesterResult,
        removeSemesterResult,
        calculateCGPA: calculateCGPAValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
