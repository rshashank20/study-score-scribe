
import { Course, Grade, SemesterResult } from '../types';

// Grade point mapping
const gradePoints: Record<Grade, number> = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'P': 4,
  'F': 0
};

// Calculate SGPA for a single semester
export const calculateSGPA = (courses: Course[]): number => {
  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach(course => {
    if (course.grade && course.grade !== 'F') {
      totalCredits += course.credits;
      totalGradePoints += course.credits * gradePoints[course.grade];
    }
  });

  if (totalCredits === 0) {
    return 0;
  }

  return parseFloat((totalGradePoints / totalCredits).toFixed(2));
};

// Calculate CGPA from multiple semester results
export const calculateCGPA = (semesters: SemesterResult[]): number => {
  let totalCredits = 0;
  let totalGradePoints = 0;

  semesters.forEach(semester => {
    const semesterCredits = semester.totalCredits;
    totalCredits += semesterCredits;
    totalGradePoints += semesterCredits * semester.sgpa;
  });

  if (totalCredits === 0) {
    return 0;
  }

  return parseFloat((totalGradePoints / totalCredits).toFixed(2));
};

// Generate a sample course list based on branch and semester
export const generateSampleCourses = (branchId: string, semesterId: number): Course[] => {
  // This is just sample data - in a real app, this would come from an API or database
  // For now, we'll just return some dummy courses
  const baseCourses: Course[] = [
    { id: '1', code: 'MA101', name: 'Engineering Mathematics', credits: 4, grade: undefined },
    { id: '2', code: 'CS101', name: 'Introduction to Programming', credits: 3, grade: undefined },
    { id: '3', code: 'PH101', name: 'Engineering Physics', credits: 4, grade: undefined },
    { id: '4', code: 'HS101', name: 'Communication Skills', credits: 2, grade: undefined },
    { id: '5', code: 'ME101', name: 'Engineering Mechanics', credits: 4, grade: undefined },
  ];

  // For CSE branch, add specific courses
  if (branchId === 'cse') {
    if (semesterId === 1) {
      return [...baseCourses];
    } else if (semesterId === 2) {
      return [
        { id: '6', code: 'MA102', name: 'Advanced Mathematics', credits: 4, grade: undefined },
        { id: '7', code: 'CS102', name: 'Data Structures', credits: 4, grade: undefined },
        { id: '8', code: 'EC101', name: 'Digital Electronics', credits: 3, grade: undefined },
        { id: '9', code: 'HS102', name: 'Economics', credits: 2, grade: undefined },
        { id: '10', code: 'CS103', name: 'Object Oriented Programming', credits: 4, grade: undefined },
      ];
    }
  }
  
  // For ECE branch
  if (branchId === 'ece') {
    if (semesterId === 1) {
      return [
        ...baseCourses.slice(0, 3),
        { id: '11', code: 'EC101', name: 'Basic Electronics', credits: 4, grade: undefined },
        { id: '12', code: 'EC102', name: 'Electronic Devices', credits: 3, grade: undefined },
      ];
    }
  }
  
  // For Industrial Engineering and Management branch
  if (branchId === 'iem') {
    if (semesterId === 3) { // Term 3 from the image
      return [
        { id: 'iem1', code: '23IM3PCEMM', name: 'Engineering Materials And Mechanics', credits: 4, department: 'IM', term: 3, grade: undefined },
        { id: 'iem2', code: '23IM3PCIME', name: 'Industrial Metrology', credits: 3, department: 'IM', term: 3, grade: undefined },
        { id: 'iem3', code: '23IM3PCMAP', name: 'Manufacturing Process', credits: 4, department: 'IM', term: 3, grade: undefined },
        { id: 'iem4', code: '23IM3PCCMD', name: 'Computer Aided Machine Drawing', credits: 3, department: 'IM', term: 3, grade: undefined },
        { id: 'iem5', code: '24NCMC3TA1', name: 'Theatre Arts -I', credits: 0, department: 'IM', term: 3, grade: undefined },
        { id: 'iem6', code: '23MA3BSTFN', name: 'Transform Calculus, Fourier Series And Numerical Techniques', credits: 3, department: 'MAT', term: 3, grade: undefined },
        { id: 'iem7', code: '23IM3BSBFE', name: 'Biology For Engineers', credits: 1, department: 'IM', term: 3, grade: undefined },
        { id: 'iem8', code: '23IM3ESEPS', name: 'Elements Of Power Systems', credits: 3, department: 'IM', term: 3, grade: undefined },
        { id: 'iem9', code: '23IM3AEOET', name: 'Overview Of Emerging Technologies', credits: 1, department: 'IM', term: 3, grade: undefined },
      ];
    }
  }
  
  // Default case
  return baseCourses;
};
