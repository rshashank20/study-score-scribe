export type Branch = {
  id: string;
  name: string;
};

export type Semester = {
  id: number;
  name: string;
};

export type Grade = {
  letter: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';
  value: number;
};

export type GradePoint = {
  grade: Grade;
  points: number;
};

export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  department?: string;
  term?: number;
  grade?: Grade;
};

export type SemesterResult = {
  semesterId: number;
  semesterName: string;
  sgpa: number;
  totalCredits: number;
  courses: Course[];
};

export type CGPAResult = {
  cgpa: number;
  semesters: SemesterResult[];
};
