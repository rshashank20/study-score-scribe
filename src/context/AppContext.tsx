import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Branch, Course, Grade, Semester, SemesterResult } from '../types';
import { calculateSGPA, calculateCGPA, generateSampleCourses } from '../utils/gpaCalculator';
import { useToast } from '@/components/ui/use-toast';
import { storage } from '@/utils/storage';

// Sample data
const branches: Branch[] = [
  { id: 'civil', name: 'Civil Engineering' },
  { id: 'mech', name: 'Mechanical Engineering' },
  { id: 'eee', name: 'Electrical and Electronics Engineering' },
  { id: 'ece', name: 'Electronics and Communication Engineering' },
  { id: 'iem', name: 'Industrial Engineering and Management' },
  { id: 'cse', name: 'Computer Science and Engineering' },
  { id: 'ete', name: 'Electronics and Telecommunication Engineering' },
  { id: 'ise', name: 'Information Science and Engineering' },
  { id: 'eie', name: 'Electronics and Instrumentation Engineering' },
  { id: 'med', name: 'Medical Electronics Engineering' },
  { id: 'chem', name: 'Chemical Engineering' },
  { id: 'bio', name: 'Bio-Technology' },
  { id: 'aero', name: 'Aerospace Engineering' },
  { id: 'ml', name: 'Machine Learning (AI and ML)' },
  { id: 'cseds', name: 'Computer Science and Engineering (DS)' },
  { id: 'cseiot', name: 'Computer Science and Engineering (IoT and CS)' },
  { id: 'aids', name: 'Artificial Intelligence and Data Science' },
  { id: 'csebs', name: 'Computer Science and Business Systems' }
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

  // Load saved data on mount
  useEffect(() => {
    const savedCourses = storage.getCourses();
    const savedResults = storage.getSemesterResults();
    
    if (savedCourses.length > 0) {
      setCourses(savedCourses);
    }
    if (savedResults.length > 0) {
      setSemesterResults(savedResults);
    }
  }, []);

  // Save courses whenever they change
  useEffect(() => {
    if (courses.length > 0) {
      storage.saveCourses(courses);
    }
  }, [courses]);

  // Save semester results whenever they change
  useEffect(() => {
    if (semesterResults.length > 0) {
      storage.saveSemesterResults(semesterResults);
    }
  }, [semesterResults]);

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

  const removeCourse = (courseId: string) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    toast({
      title: "Course removed",
      description: "The course has been removed from your list.",
    });
  };

  const resetCurrentSelection = () => {
    setSelectedBranchState(null);
    setSelectedSemesterState(null);
    setCourses([]);
  };

  const calculateAndSaveSemester = () => {
    if (!selectedSemester || courses.length === 0) return;

    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const weightedSum = courses.reduce((sum, course) => {
      if (!course.grade) return sum;
      return sum + (course.credits * course.grade.value);
    }, 0);

    const sgpa = weightedSum / totalCredits;

    const newResult: SemesterResult = {
      semesterId: selectedSemester.id,
      semesterName: selectedSemester.name,
      sgpa,
      totalCredits,
      courses: [...courses]
    };

    setSemesterResults(prev => [...prev, newResult]);
    toast({
      title: "Semester saved",
      description: `Your ${selectedSemester.name} results have been saved.`,
    });
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
