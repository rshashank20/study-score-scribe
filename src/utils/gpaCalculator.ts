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
  // Branch-specific courses
  const branchCourses: Record<string, Record<number, Course[]>> = {
    'cse': {
      1: [
        { id: 'cse1-1', code: 'CS103', name: 'Introduction to Computer Science', credits: 3, grade: undefined },
        { id: 'cse1-2', code: 'CS104', name: 'Digital Electronics', credits: 4, grade: undefined },
      ],
      2: [
        { id: 'cse2-1', code: 'CS201', name: 'Data Structures', credits: 4, grade: undefined },
        { id: 'cse2-2', code: 'CS202', name: 'Computer Organization', credits: 4, grade: undefined },
      ],
      3: [
        { id: 'cse3-1', code: '23MA3BSSDM', name: 'Statistics and Discrete Mathematics', credits: 3, grade: undefined },
        { id: 'cse3-2', code: '23CS3ESCOA', name: 'Computer Organization and Architecture', credits: 3, grade: undefined },
        { id: 'cse3-3', code: '23CS3PCOOJ', name: 'Object Oriented Java Programming', credits: 4, grade: undefined },
        { id: 'cse3-4', code: '23CS3PCLOD', name: 'Logic Design', credits: 2, grade: undefined },
        { id: 'cse3-5', code: '23CS3PCDBM', name: 'Database Management Systems', credits: 4, grade: undefined },
        { id: 'cse3-6', code: '23CS3PCDST', name: 'Data Structures', credits: 4, grade: undefined },
        { id: 'cse3-7', code: '23CS3PCUSP', name: 'Unix Shell Programming', credits: 1, grade: undefined },
        { id: 'cse3-8', code: '23CS3AEFWD', name: 'Full Stack Web development', credits: 1, grade: undefined },
        { id: 'cse3-9', code: '23CS3AETEW', name: 'Technical Writing', credits: 1, grade: undefined },
        { id: 'cse3-10', code: '23CS3AEASL', name: 'Assembly Language', credits: 1, grade: undefined },
        { id: 'cse3-11', code: '23NCMC3NS1', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      4: [
        { id: 'cse4-1', code: '23MA4BSLAO', name: 'Linear Algebra and Optimization', credits: 3, grade: undefined },
        { id: 'cse4-2', code: '23CS4ESCRP', name: 'Cryptography', credits: 3, grade: undefined },
        { id: 'cse4-3', code: '23CS4PCTFC', name: 'Theoretical Foundations of Computations', credits: 3, grade: undefined },
        { id: 'cse4-4', code: '23CS4PCOPS', name: 'Operating Systems', credits: 4, grade: undefined },
        { id: 'cse4-5', code: '23CS4PCADA', name: 'Analysis and Design of Algorithms', credits: 4, grade: undefined },
        { id: 'cse4-6', code: '23CS4PCSED', name: 'Software Engineering', credits: 3, grade: undefined },
        { id: 'cse4-7', code: '22MA4AEUHV', name: 'Universal Human Values', credits: 1, grade: undefined },
        { id: 'cse4-8', code: '23CS4AEMAD', name: 'Mobile Application Development', credits: 1, grade: undefined },
        { id: 'cse4-9', code: '23CS4AEUIX', name: 'UI/UX Design', credits: 1, grade: undefined },
        { id: 'cse4-10', code: '23CS4AEHID', name: 'Hardware interface design', credits: 1, grade: undefined },
        { id: 'cse4-11', code: '23NCMC4NS2', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      5: [
        { id: 'cse5-1', code: '23CS5PCOOM', name: 'Object Oriented Modelling', credits: 3, grade: undefined },
        { id: 'cse5-2', code: '23CS5PCDEV', name: 'Data Exploration and Visualization', credits: 3, grade: undefined },
        { id: 'cse5-3', code: '23CS5PCAIN', name: 'Artificial Intelligence', credits: 4, grade: undefined },
        { id: 'cse5-4', code: '23CS5PCCON', name: 'Computer Networks', credits: 4, grade: undefined },
        { id: 'cse5-5', code: '23CV5HSEVS', name: 'Environmental Studies', credits: 1, grade: undefined },
        { id: 'cse5-6', code: '23CS5BSBIS', name: 'Bio Inspired Systems', credits: 1, grade: undefined },
        { id: 'cse5-7', code: '23CS5PEXXX', name: 'Professional Elective (RPA/CPD/CGH/AAM)', credits: 3, grade: undefined },
        { id: 'cse5-8', code: '23CS5AEAST', name: 'Automated Software Testing', credits: 1, grade: undefined },
        { id: 'cse5-9', code: '23CS5AECCO', name: 'Competitive Coding', credits: 1, grade: undefined },
        { id: 'cse5-10', code: '23CS5AEDOP', name: 'DevOps - Tools', credits: 1, grade: undefined },
        { id: 'cse5-11', code: '23CS5PWMP', name: 'Mini Project', credits: 2, grade: undefined },
        { id: 'cse5-12', code: '23NCMC5NS3', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      6: [
        { id: 'cse6-1', code: '23CS6PCCCT', name: 'Cloud Computing', credits: 3, grade: undefined },
        { id: 'cse6-2', code: '23CS6PCBDA', name: 'Big Data Analytics', credits: 4, grade: undefined },
        { id: 'cse6-3', code: '23CS6PCMLA', name: 'Machine Learning', credits: 4, grade: undefined },
        { id: 'cse6-4', code: '23CS6AERML', name: 'Research Methodology and IPR', credits: 3, grade: undefined },
        { id: 'cse6-5', code: '23CS6PEXXX', name: 'Professional Elective (ACN/BLC/CVI/ADS)', credits: 3, grade: undefined },
        { id: 'cse6-6', code: '23CS6OEXXX', name: 'Open Elective (AIN/CRP/DST/RPA)', credits: 3, grade: undefined },
        { id: 'cse6-7', code: '23CS6PWPP1', name: 'Major Project Phase-1', credits: 2, grade: undefined },
        { id: 'cse6-8', code: '23NCMC6NS4', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      7: [
        { id: 'cse7-1', code: '23CS7PCNWP', name: 'Network Programming', credits: 3, grade: undefined },
        { id: 'cse7-2', code: '23CS7PCMNE', name: 'Management and Entrepreneurship', credits: 3, grade: undefined },
        { id: 'cse7-3', code: '23CS7PEXXX', name: 'Professional Elective (SWA/SCN/NLP/WMC)', credits: 3, grade: undefined },
        { id: 'cse7-4', code: '23CS7OEXXX', name: 'Open Elective (MAL/INS/ADA)', credits: 3, grade: undefined },
        { id: 'cse7-5', code: '23CS7PWPP2', name: 'Major Project Phase-2', credits: 8, grade: undefined },
      ],
      8: [
        { id: 'cse8-1', code: '23CS8PEXXX', name: 'Professional Elective (NES/NDL/VAR/HPC)', credits: 3, grade: undefined },
        { id: 'cse8-2', code: '23CS8OEXXX', name: 'Open Elective (DEL/CYS/OOJ)', credits: 3, grade: undefined },
        { id: 'cse8-3', code: '23CS8SRINT', name: 'Internship', credits: 6, grade: undefined },
      ],
    },
    'ece': {
      1: [
        { id: 'ece1-1', code: 'EC101', name: 'Basic Electronics', credits: 4, grade: undefined },
        { id: 'ece1-2', code: 'EC102', name: 'Electronic Devices', credits: 3, grade: undefined },
      ],
      2: [
        { id: 'ece2-1', code: 'EC201', name: 'Digital Electronics', credits: 4, grade: undefined },
        { id: 'ece2-2', code: 'EC202', name: 'Network Analysis', credits: 4, grade: undefined },
      ],
      3: [
        { id: 'ece3-1', code: '23MA3BSTFN', name: 'Transform Calculus, Fourier Series and Numerical Techniques', credits: 3, grade: undefined },
        { id: 'ece3-2', code: '23EC3ESHIDL', name: 'HDL Programming', credits: 3, grade: undefined },
        { id: 'ece3-3', code: '23EC3PCAEC', name: 'Analog Electronic Circuits', credits: 3, grade: undefined },
        { id: 'ece3-4', code: '23EC3PCDCD', name: 'Digital Circuit Design', credits: 3, grade: undefined },
        { id: 'ece3-5', code: '23EC3PCSAS', name: 'Signals and Systems', credits: 4, grade: undefined },
        { id: 'ece3-6', code: '23ES3PCNAL', name: 'Network Analysis', credits: 3, grade: undefined },
        { id: 'ece3-7', code: '23ES3BSBFE', name: 'Biology for Engineers', credits: 1, grade: undefined },
        { id: 'ece3-8', code: '23EC3PCIEL', name: 'Integrated Electronics Lab', credits: 1, grade: undefined },
        { id: 'ece3-9', code: '23EC3AEHPL', name: 'HDL Programming Lab', credits: 1, grade: undefined },
        { id: 'ece3-10', code: '23NCMC3NS1', name: 'NSS / Yoga / Physical Education (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      4: [
        { id: 'ece4-1', code: '23MA4BSCPS', name: 'Complex Analysis, Probability and Statistical Methods', credits: 3, grade: undefined },
        { id: 'ece4-2', code: '23ES4ESCST', name: 'Control Systems', credits: 3, grade: undefined },
        { id: 'ece4-3', code: '23EC4PCFAW', name: 'Fields and Waves', credits: 3, grade: undefined },
        { id: 'ece4-4', code: '23EC4PCAIC', name: 'Analog Integrated Circuits', credits: 3, grade: undefined },
        { id: 'ece4-5', code: '23ES4PCAPP', name: 'ARM Processor and Programming', credits: 4, grade: undefined },
        { id: 'ece4-6', code: '23EC4PCPCS', name: 'Principles of Communication Systems', credits: 4, grade: undefined },
        { id: 'ece4-7', code: '23MA4AEUHV', name: 'Universal Human Values', credits: 1, grade: undefined },
        { id: 'ece4-8', code: '23EC4AEAPl', name: 'Applied Python Programming Lab', credits: 1, grade: undefined },
        { id: 'ece4-9', code: '23NCMC4NS2', name: 'NSS / Yoga / Physical Education (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      5: [
        { id: 'ece5-1', code: '23EC5PCFOV', name: 'Fundamentals of VLSI', credits: 3, grade: undefined },
        { id: 'ece5-2', code: '23EC5PCMTA', name: 'Microwave Theory and Antenna', credits: 4, grade: undefined },
        { id: 'ece5-3', code: '23EC5PCDSP', name: 'Digital Signal Processing', credits: 3, grade: undefined },
        { id: 'ece5-4', code: '23EC5PCDCT', name: 'Digital Communication Theory', credits: 4, grade: undefined },
        { id: 'ece5-5', code: '23CV5HSEVS', name: 'Environmental Studies', credits: 1, grade: undefined },
        { id: 'ece5-6', code: '23EC5PE1XX', name: 'Professional Elective – 1', credits: 3, grade: undefined },
        { id: 'ece5-7', code: '23ES5HSPMF', name: 'Project Management and Finance', credits: 2, grade: undefined },
        { id: 'ece5-8', code: '23EC5PWMPJ', name: 'Mini Project', credits: 2, grade: undefined },
        { id: 'ece5-9', code: '23NCMC5NS3', name: 'NSS / Yoga / Physical Education (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      6: [
        { id: 'ece6-1', code: '23EC6PCWCN', name: 'Wireless Communication and Networks', credits: 3, grade: undefined },
        { id: 'ece6-2', code: '23EC6PCCCN', name: 'Computer Communication Networks', credits: 4, grade: undefined },
        { id: 'ece6-3', code: '23EC6PCMSD', name: 'Mixed Signal Design', credits: 4, grade: undefined },
        { id: 'ece6-4', code: '23EC6PE2XX', name: 'Professional Elective – 2', credits: 3, grade: undefined },
        { id: 'ece6-5', code: '23EC6OE1XX', name: 'Open Elective – 1', credits: 3, grade: undefined },
        { id: 'ece6-6', code: '23ES6AERMI', name: 'Research Methodology and IPR', credits: 2, grade: undefined },
        { id: 'ece6-7', code: '23EC6AEASP', name: 'Advanced Signal Processing Lab', credits: 1, grade: undefined },
        { id: 'ece6-8', code: '23EC6PWPJ1', name: 'Project Work – 1', credits: 2, grade: undefined },
        { id: 'ece6-9', code: '23NCMC6NS4', name: 'NSS / Yoga / Physical Education (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      7: [
        { id: 'ece7-1', code: '23EC7PCESD', name: 'Embedded System Design', credits: 4, grade: undefined },
        { id: 'ece7-2', code: '23EC7PCECS', name: 'Electronics and Communication for Sustainable Development', credits: 2, grade: undefined },
        { id: 'ece7-3', code: '23EC7PE3XX', name: 'Professional Elective – 3', credits: 3, grade: undefined },
        { id: 'ece7-4', code: '23EC7OE2XX', name: 'Open Elective – 2', credits: 3, grade: undefined },
        { id: 'ece7-5', code: '23EC7PWPJ2', name: 'Project Work – 2', credits: 7, grade: undefined },
        { id: 'ece7-6', code: '25MA7HSIKL', name: 'Indian Knowledge Systems', credits: 1, grade: undefined },
      ],
      8: [
        { id: 'ece8-1', code: '23EC8PE4XX', name: 'Professional Elective – 4', credits: 3, grade: undefined },
        { id: 'ece8-2', code: '23EC8OE3XX', name: 'Open Elective – 3', credits: 3, grade: undefined },
        { id: 'ece8-3', code: '23EC8SRINT', name: 'Internship', credits: 6, grade: undefined },
      ],
    },
    'civil': {
      1: [
        { id: 'civil1-1', code: 'CE101', name: 'Engineering Drawing', credits: 3, grade: undefined },
        { id: 'civil1-2', code: 'CE102', name: 'Building Materials', credits: 4, grade: undefined },
      ],
      2: [
        { id: 'civil2-1', code: 'CE201', name: 'Structural Analysis', credits: 4, grade: undefined },
        { id: 'civil2-2', code: 'CE202', name: 'Fluid Mechanics', credits: 4, grade: undefined },
      ],
      3: [
        { id: 'civil3-1', code: '23MA3BSMCV', name: 'Mathematics for Civil Engineering-3', credits: 3, grade: undefined },
        { id: 'civil3-2', code: '23CV3PCBMC', name: 'Building Materials and Construction', credits: 3, grade: undefined },
        { id: 'civil3-3', code: '23CV3ESENG', name: 'Engineering Geology', credits: 3, grade: undefined },
        { id: 'civil3-4', code: '23CV3PCFME', name: 'Fluid Mechanics', credits: 3, grade: undefined },
        { id: 'civil3-5', code: '23CV3PCGDY', name: 'Geodesy', credits: 4, grade: undefined },
        { id: 'civil3-6', code: '23CV3PCSOM', name: 'Strength of Materials', credits: 4, grade: undefined },
        { id: 'civil3-7', code: '23CV3BSBFE', name: 'Biology for Engineers', credits: 1, grade: undefined },
        { id: 'civil3-8', code: '23CV3AEIME', name: 'Introduction to MS Excel', credits: 1, grade: undefined },
        { id: 'civil3-9', code: '23NCMC3YG1', name: 'YOGA / NSS / Physical Education (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      4: [
        { id: 'civil4-1', code: '23CV4ESBDC', name: 'Building Drawing and CAD', credits: 3, grade: undefined },
        { id: 'civil4-2', code: '23CV4PCCON', name: 'Concrete Technology', credits: 3, grade: undefined },
        { id: 'civil4-3', code: '23CV4PCENV', name: 'Environmental Engineering -1', credits: 3, grade: undefined },
        { id: 'civil4-4', code: '23CV4PCGTE', name: 'Geotechnical Engineering-1', credits: 4, grade: undefined },
        { id: 'civil4-5', code: '23CV4PCHYE', name: 'Hydraulic Engineering', credits: 3, grade: undefined },
        { id: 'civil4-6', code: '23CV4PCSTA', name: 'Structural Analysis', credits: 4, grade: undefined },
        { id: 'civil4-7', code: '22MA4HSUHV', name: 'Universal Human Values', credits: 1, grade: undefined },
        { id: 'civil4-8', code: '23CV4AEBIM', name: 'Introduction to Building Information Modeling', credits: 1, grade: undefined },
        { id: 'civil4-9', code: '23NCMC4NS2', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      5: [
        { id: 'civil5-1', code: '23CV5PCDRC', name: 'Design of RC Structural Elements', credits: 3, grade: undefined },
        { id: 'civil5-2', code: '23CV5PCENV', name: 'Environmental Engineering-II', credits: 3, grade: undefined },
        { id: 'civil5-3', code: '23CV5PCGTE', name: 'Geotechnical Engineering-II', credits: 3, grade: undefined },
        { id: 'civil5-4', code: '23CV5PCHEN', name: 'Highway Engineering', credits: 3, grade: undefined },
        { id: 'civil5-5', code: '23CV5PCSSA', name: 'Structural Systems Analysis', credits: 2, grade: undefined },
        { id: 'civil5-6', code: '23CV5PEXXX', name: 'Professional Elective -1', credits: 3, grade: undefined },
        { id: 'civil5-7', code: '23CV5PWMIP', name: 'Minor Project', credits: 2, grade: undefined },
        { id: 'civil5-8', code: '23CV5AERMY', name: 'Research Methodology', credits: 2, grade: undefined },
        { id: 'civil5-9', code: '23CV5HSEVS', name: 'Environmental Studies', credits: 1, grade: undefined },
        { id: 'civil5-10', code: '23NCMC5NS3', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      6: [
        { id: 'civil6-1', code: '23CV6PCDSS', name: 'Design of Steel Structural Elements and Software applications lab', credits: 3, grade: undefined },
        { id: 'civil6-2', code: '23CV6PCBFS', name: 'Bridge Engineering and Foundation systems', credits: 3, grade: undefined },
        { id: 'civil6-3', code: '23CV6PCHIE', name: 'Hydrology and Irrigation Engineering', credits: 2, grade: undefined },
        { id: 'civil6-4', code: '23CV6PCTSE', name: 'Transportation Systems Engineering', credits: 3, grade: undefined },
        { id: 'civil6-5', code: '23CV6AEPMF', name: 'Project Management and Finance', credits: 2, grade: undefined },
        { id: 'civil6-6', code: '23CV6PEXXX', name: 'Professional Elective -2', credits: 3, grade: undefined },
        { id: 'civil6-7', code: '23CV6OEXXX', name: 'Open Elective -1', credits: 3, grade: undefined },
        { id: 'civil6-8', code: '23CV6PWMP1', name: 'Major Project Phase 1', credits: 1, grade: undefined },
        { id: 'civil6-9', code: '23CV6PWESP', name: 'Extensive survey project', credits: 2, grade: undefined },
        { id: 'civil6-10', code: '23NCMC6NS4', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      7: [
        { id: 'civil7-1', code: '23CV7PCQSC', name: 'Quantity survey and Estimation', credits: 3, grade: undefined },
        { id: 'civil7-2', code: '23CV7BSMLC', name: 'Machine learning for Civil Engineering Applications', credits: 2, grade: undefined },
        { id: 'civil7-3', code: '23CV7PCPPR', name: 'Professional practice for civil Engineers', credits: 1, grade: undefined },
        { id: 'civil7-4', code: '23CV7PEXXX', name: 'Professional Elective -4', credits: 3, grade: undefined },
        { id: 'civil7-5', code: '23CV7OEXXX', name: 'Open Elective -2', credits: 3, grade: undefined },
        { id: 'civil7-6', code: '23CV7PWMP2', name: 'Major project phase 2', credits: 8, grade: undefined },
      ],
      8: [
        { id: 'civil8-1', code: '23CV8PEXXX', name: 'Professional Elective -4', credits: 3, grade: undefined },
        { id: 'civil8-2', code: '23CV8OEXXX', name: 'Open Elective -3', credits: 3, grade: undefined },
        { id: 'civil8-3', code: '23CV8SRINT', name: 'Internship (16-20 weeks)', credits: 6, grade: undefined },
      ],
    },
    'mech': {
      1: [
        { id: 'mech1-1', code: 'ME101', name: 'Engineering Drawing', credits: 3, grade: undefined },
        { id: 'mech1-2', code: 'ME102', name: 'Workshop Practice', credits: 2, grade: undefined },
      ],
      2: [
        { id: 'mech2-1', code: 'ME201', name: 'Thermodynamics', credits: 4, grade: undefined },
        { id: 'mech2-2', code: 'ME202', name: 'Fluid Mechanics', credits: 4, grade: undefined },
      ],
      3: [
        { id: 'mech3-1', code: '23MA3BSTFN', name: 'Transform Calculus, Fourier Series and Numerical Techniques', credits: 3, grade: undefined },
        { id: 'mech3-2', code: '23ME3ESMSM', name: 'Materials Science and Metallurgy', credits: 3, grade: undefined },
        { id: 'mech3-3', code: '23ME3PCETD', name: 'Engineering Thermodynamics', credits: 4, grade: undefined },
        { id: 'mech3-4', code: '22ME3PCMAP', name: 'Manufacturing Processes', credits: 4, grade: undefined },
        { id: 'mech3-5', code: '23ME3PCSOM', name: 'Strength of Materials', credits: 4, grade: undefined },
        { id: 'mech3-6', code: '22ME3PCCMD', name: 'Computer Aided Machine Drawing', credits: 2, grade: undefined },
        { id: 'mech3-7', code: '23ME3BSBFE', name: 'Biology for Engineers', credits: 1, grade: undefined },
        { id: 'mech3-8', code: '23MA3AEMCL', name: 'Machine Learning for Mechanical Engineers', credits: 2, grade: undefined },
        { id: 'mech3-9', code: '23ME3NCNSS', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      4: [
        { id: 'mech4-1', code: '23MA4BSCPS', name: 'Complex Analysis, Probability and Statistical Methods', credits: 3, grade: undefined },
        { id: 'mech4-2', code: '23ME4ESORE', name: 'Operation Research', credits: 3, grade: undefined },
        { id: 'mech4-3', code: '23ME4PCFME', name: 'Fluid Mechanics', credits: 3, grade: undefined },
        { id: 'mech4-4', code: '23ME4PCFMT', name: 'Manufacturing Technology', credits: 3, grade: undefined },
        { id: 'mech4-5', code: '23ME4PCTOM', name: 'Theory of Machines', credits: 4, grade: undefined },
        { id: 'mech4-6', code: '23ME4PCDM1', name: 'Design of Machine Elements-I', credits: 3, grade: undefined },
        { id: 'mech4-7', code: '23ME4AEDTI', name: 'Digital Twin and Ideation', credits: 2, grade: undefined },
        { id: 'mech4-8', code: '23ME4AEUHV', name: 'Universal Human Values', credits: 1, grade: undefined },
        { id: 'mech4-9', code: '23ME4NCNSS', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      5: [
        { id: 'mech5-1', code: '23ME5PCDM2', name: 'Design of Machine Elements–2', credits: 3, grade: undefined },
        { id: 'mech5-2', code: '23ME5PCMMM', name: 'Mechanical Measurements and Metrology', credits: 4, grade: undefined },
        { id: 'mech5-3', code: '23ME5PCMEV', name: 'Mechanical Vibrations', credits: 3, grade: undefined },
        { id: 'mech5-4', code: '23ME5PCTFE', name: 'Thermal and Fluids Engineering', credits: 4, grade: undefined },
        { id: 'mech5-5', code: '23ME5PE***', name: 'Professional Elective -1', credits: 3, grade: undefined },
        { id: 'mech5-6', code: '23ME5PWMPW', name: 'Mini Project work', credits: 2, grade: undefined },
        { id: 'mech5-7', code: '23ME5HSEVS', name: 'Environmental Studies', credits: 1, grade: undefined },
        { id: 'mech5-8', code: '23ME5AEREM', name: 'Research Methodology', credits: 2, grade: undefined },
        { id: 'mech5-9', code: '23ME5NCNSS', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      6: [
        { id: 'mech6-1', code: '23ME6PCMFE', name: 'Modelling and Finite Element Analysis', credits: 4, grade: undefined },
        { id: 'mech6-2', code: '23ME6PCAUR', name: 'Automation and Robotics', credits: 3, grade: undefined },
        { id: 'mech6-3', code: '23ME6PCHTR', name: 'Heat Transfer', credits: 4, grade: undefined },
        { id: 'mech6-4', code: '23ME6PCCOE', name: 'Control Engineering', credits: 3, grade: undefined },
        { id: 'mech6-5', code: '23ME6PE***', name: 'Professional Elective -2', credits: 3, grade: undefined },
        { id: 'mech6-6', code: '23**OE***', name: 'Open Elective -1', credits: 3, grade: undefined },
        { id: 'mech6-7', code: '23ME6PWMJ1', name: 'Project Work Phase -1', credits: 2, grade: undefined },
        { id: 'mech6-8', code: '23ME6NCNSS', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      7: [
        { id: 'mech7-1', code: '23ME7PCMCT', name: 'Mechatronics', credits: 3, grade: undefined },
        { id: 'mech7-2', code: '23ME7PLDES', name: 'Design Lab', credits: 1, grade: undefined },
        { id: 'mech7-3', code: '23ME7LAML', name: 'Advanced Manufacturing Lab', credits: 1, grade: undefined },
        { id: 'mech7-4', code: '23ME7PE***', name: 'Professional Elective-3', credits: 3, grade: undefined },
        { id: 'mech7-5', code: '23**7OE***', name: 'Open Elective-2', credits: 3, grade: undefined },
        { id: 'mech7-6', code: '23ME7AEPMF', name: 'Project Management and Finance', credits: 2, grade: undefined },
        { id: 'mech7-7', code: '23ME7PWMJ2', name: 'Project work Phase-2', credits: 7, grade: undefined },
      ],
      8: [
        { id: 'mech8-1', code: '23ME8PEXXX', name: 'Professional Elective-4', credits: 3, grade: undefined },
        { id: 'mech8-2', code: '23**8OE**', name: 'Open Elective-3', credits: 3, grade: undefined },
        { id: 'mech8-3', code: '23ME8SRINT', name: 'Internship', credits: 6, grade: undefined },
      ],
    },
    'ise': {
      1: [
        { id: 'ise1-1', code: 'IS101', name: 'Introduction to Information Science', credits: 3, grade: undefined },
        { id: 'ise1-2', code: 'IS102', name: 'Digital Systems', credits: 4, grade: undefined },
      ],
      2: [
        { id: 'ise2-1', code: 'IS201', name: 'Data Structures', credits: 4, grade: undefined },
        { id: 'ise2-2', code: 'IS202', name: 'Database Management Systems', credits: 4, grade: undefined },
      ],
      3: [
        { id: 'ise3-1', code: '23MA3BSSDM', name: 'Statistics and Discrete Mathematics', credits: 3, grade: undefined },
        { id: 'ise3-2', code: '23IS3PCCOA', name: 'Computer Organization and Architecture', credits: 3, grade: undefined },
        { id: 'ise3-3', code: '23IS3PCDSC', name: 'Data Structures', credits: 4, grade: undefined },
        { id: 'ise3-4', code: '23IS3PCOOP', name: 'Object Oriented Programming using C++', credits: 4, grade: undefined },
        { id: 'ise3-5', code: '23IS3PCDLD', name: 'Digital Logic Design', credits: 3, grade: undefined },
        { id: 'ise3-6', code: '23IS3PCOPS', name: 'Operating Systems', credits: 4, grade: undefined },
        { id: 'ise3-7', code: '23IS3AEUSP', name: 'UNIX System Programming', credits: 1, grade: undefined },
        { id: 'ise3-8', code: '23IS3PENCM', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      4: [
        { id: 'ise4-1', code: '23MA4BSLIA', name: 'Linear Algebra', credits: 3, grade: undefined },
        { id: 'ise4-2', code: '23IS4ESTFC', name: 'Theoretical Foundations of Computation', credits: 3, grade: undefined },
        { id: 'ise4-3', code: '23IS4PCDBM', name: 'Database Management System', credits: 4, grade: undefined },
        { id: 'ise4-4', code: '23IS4PCADA', name: 'Analysis and Design of Algorithms', credits: 4, grade: undefined },
        { id: 'ise4-5', code: '23IS4PCSEG', name: 'Software Engineering', credits: 2, grade: undefined },
        { id: 'ise4-6', code: '23IS4PCJAV', name: 'Java Programming', credits: 4, grade: undefined },
        { id: 'ise4-7', code: '23MA4AEUHV', name: 'Universal Human Values', credits: 1, grade: undefined },
        { id: 'ise4-8', code: '23IS4AECPG', name: 'Competitive Programming', credits: 1, grade: undefined },
        { id: 'ise4-9', code: '23IS4PENCM', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      5: [
        { id: 'ise5-1', code: '23IS5PCCN1', name: 'Computer Networks – 1', credits: 4, grade: undefined },
        { id: 'ise5-2', code: '23IS5PCMLG', name: 'Machine Learning', credits: 4, grade: undefined },
        { id: 'ise5-3', code: '23IS5PCCNS', name: 'Cryptography and Network Security', credits: 3, grade: undefined },
        { id: 'ise5-4', code: '23IS5PCSTG', name: 'Software Testing', credits: 3, grade: undefined },
        { id: 'ise5-5', code: '23IS5PENLP', name: 'Natural Language Processing (Professional Elective)', credits: 3, grade: undefined },
        { id: 'ise5-6', code: '23IS5PEBCT', name: 'Block Chain Technology (Professional Elective)', credits: 3, grade: undefined },
        { id: 'ise5-7', code: '23IS5PEAIS', name: 'Artificial Intelligence (Professional Elective)', credits: 3, grade: undefined },
        { id: 'ise5-8', code: '23IS5PEADS', name: 'Advanced Data Structures and Algorithm (Professional Elective)', credits: 3, grade: undefined },
        { id: 'ise5-9', code: '23IS5PWAPP', name: 'Advance Python Programming', credits: 2, grade: undefined },
        { id: 'ise5-10', code: '23IS5HSEVS', name: 'Environmental Studies (CV/CH)', credits: 1, grade: undefined },
        { id: 'ise5-11', code: '23IS5AERML', name: 'Research Methodology', credits: 2, grade: undefined },
      ],
      6: [
        { id: 'ise6-1', code: '23IS6BSBIO', name: 'Bioinformatics', credits: 1, grade: undefined },
        { id: 'ise6-2', code: '23IS6PCCN2', name: 'Computer Networks - 2', credits: 4, grade: undefined },
        { id: 'ise6-3', code: '23IS6PCCLC', name: 'Cloud Computing', credits: 4, grade: undefined },
        { id: 'ise6-4', code: '23IS6PCMAD', name: 'Mobile Application Development', credits: 2, grade: undefined },
        { id: 'ise6-5', code: '23IS6PCOMD', name: 'Object Oriented and Modelling Design Patterns', credits: 2, grade: undefined },
        { id: 'ise6-6', code: '23IS6PESNA', name: 'Social Network Analysis (PE2 option)', credits: 0, grade: undefined },
        { id: 'ise6-7', code: '23IS6PEBDA', name: 'Big Data Analytics (PE2 option)', credits: 3, grade: undefined },
        { id: 'ise6-8', code: '23IS6PEDLG', name: 'Deep Learning (PE2 option)', credits: 3, grade: undefined },
        { id: 'ise6-9', code: '23IS6PESOA', name: 'Service Oriented Architecture (PE2 option)', credits: 0, grade: undefined },
        { id: 'ise6-10', code: '23IS6OEWTG', name: 'Web technologies (OE1 option)', credits: 0, grade: undefined },
        { id: 'ise6-11', code: '23IS6OEDSA', name: 'Data Structures and Algorithms (OE1 option)', credits: 0, grade: undefined },
        { id: 'ise6-12', code: '23IS6OECNS', name: 'Cryptography and Network Security (OE1 option)', credits: 3, grade: undefined },
        { id: 'ise6-13', code: '23IS6OERPA', name: 'Robotic Process Automation Design and Development (OE1 option)', credits: 0, grade: undefined },
        { id: 'ise6-14', code: '23IS6PWPW1', name: 'Project work -1', credits: 2, grade: undefined },
        { id: 'ise6-15', code: '23IS6AEFSD', name: 'Full Stack Development', credits: 1, grade: undefined },
      ],
      7: [
        { id: 'iem7-1', code: '23IM7PCSRP', name: 'Supply Chain Management and ERP', credits: 4, grade: undefined },
        { id: 'iem7-2', code: '23IM7PCRPM', name: 'Project Management', credits: 2, grade: undefined },
        { id: 'iem7-3', code: '23IM7PEXXX', name: 'Professional Elective -3', credits: 3, grade: undefined },
        { id: 'iem7-4', code: '23IM7OEXX', name: 'Open Elective -2', credits: 3, grade: undefined },
        { id: 'iem7-5', code: '23IM7PCPW2', name: 'Project Work-2', credits: 8, grade: undefined },
      ],
      8: [
        { id: 'iem8-1', code: '23IM8PEXXX', name: 'Professional Elective -4', credits: 3, grade: undefined },
        { id: 'iem8-2', code: '23IM8OEXXX', name: 'Open Elective -3', credits: 3, grade: undefined },
        { id: 'iem8-3', code: '23IM8SRINT', name: 'Internship (16-20 weeks)', credits: 6, grade: undefined },
      ],
    },
    'aids': {
      1: [
        { id: 'aids1-1', code: 'AI101', name: 'Introduction to AI', credits: 3, grade: undefined },
        { id: 'aids1-2', code: 'AI102', name: 'Python Programming', credits: 4, grade: undefined },
      ],
      2: [
        { id: 'aids2-1', code: 'AI201', name: 'Data Structures', credits: 4, grade: undefined },
        { id: 'aids2-2', code: 'AI202', name: 'Machine Learning', credits: 4, grade: undefined },
      ],
      3: [
        { id: 'aids3-1', code: '23MA3BSSDM', name: 'Statistics and Discrete Mathematics', credits: 3, grade: undefined },
        { id: 'aids3-2', code: '23DC3ESCOA', name: 'Computer Organization & Architecture', credits: 3, grade: undefined },
        { id: 'aids3-3', code: '23DC3PCDSC', name: 'Data Structures', credits: 4, grade: undefined },
        { id: 'aids3-4', code: '23DC3PCDBM', name: 'Database Management Systems', credits: 4, grade: undefined },
        { id: 'aids3-5', code: '23AI3PCIAI', name: 'Introduction to AI', credits: 4, grade: undefined },
        { id: 'aids3-6', code: '23DS3PCFDS', name: 'Foundations of Data Science', credits: 3, grade: undefined },
        { id: 'aids3-7', code: '23DC3AEFWD', name: 'Full Stack Web Development', credits: 0, grade: undefined },
        { id: 'aids3-8', code: '23DS3AEDAEE', name: 'Data Analytics with Excel', credits: 1, grade: undefined },
        { id: 'aids3-9', code: '23DS3AEELAT', name: 'Technical Writing', credits: 0, grade: undefined },
        { id: 'aids3-10', code: '23NCMC3NS1', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      4: [
        { id: 'aids4-1', code: '23MA4BSLAO', name: 'Linear Algebra and Optimization', credits: 3, grade: undefined },
        { id: 'aids4-2', code: '23DC4ESTOC', name: 'Theory of Computation', credits: 3, grade: undefined },
        { id: 'aids4-3', code: '23DC4PCOPS', name: 'Operating Systems', credits: 3, grade: undefined },
        { id: 'aids4-4', code: '23DS4PCCON', name: 'Computer Networks', credits: 3, grade: undefined },
        { id: 'aids4-5', code: '23DS4PCMLG', name: 'Machine Learning', credits: 4, grade: undefined },
        { id: 'aids4-6', code: '23DC4PCDAA', name: 'Design and Analysis of Algorithms', credits: 4, grade: undefined },
        { id: 'aids4-7', code: '23DS4AEDVZ', name: 'Data Visualization using Tools', credits: 0, grade: undefined },
        { id: 'aids4-8', code: '23DS4AEJUL', name: 'JULIA for Data Science', credits: 1, grade: undefined },
        { id: 'aids4-9', code: '23DS4AEGIT', name: 'Version Controller with GIT', credits: 1, grade: undefined },
        { id: 'aids4-10', code: '22MA4HSUHV', name: 'Universal Human Values', credits: 1, grade: undefined },
        { id: 'aids4-11', code: '23NCMC4NS2', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
    },
    'iem': {
      1: [
        { id: 'iem1-1', code: '23MA1BSCEM', name: 'Mathematical Foundation for Civil, Electrical and Mechanical Engineering stream–1', credits: 4, grade: undefined },
        { id: 'iem1-2', code: '22CY1BSCME', name: 'Applied Chemistry for Mechanical Cluster', credits: 4, grade: undefined },
        { id: 'iem1-3', code: '22ME1ESCED', name: 'Computer Aided Engineering Drawing', credits: 3, grade: undefined },
        { id: 'iem1-4', code: '22xxxxxxxx', name: 'ESC1', credits: 3, grade: undefined },
        { id: 'iem1-5', code: '22xxxxxxxx', name: 'ETC', credits: 3, grade: undefined },
        { id: 'iem1-6', code: '22MA1HSCIP', name: 'Constitution of India & Professional', credits: 1, grade: undefined },
        { id: 'iem1-7', code: '22BT1AESFH', name: 'Scientific Foundations for Health', credits: 1, grade: undefined },
        { id: 'iem1-8', code: '22MA1AECEN', name: 'Communicative English', credits: 1, grade: undefined },
      ],
      2: [
        { id: 'iem2-1', code: '23MA2BSMCM', name: 'Mathematical Foundation for Civil, Electrical and Mechanical Engineering stream–2', credits: 4, grade: undefined },
        { id: 'iem2-2', code: '22PH2BSPME', name: 'Applied Physics for Mechanical Cluster', credits: 4, grade: undefined },
        { id: 'iem2-3', code: '22ME2ESME', name: 'Elements of Mechanical Engineering', credits: 3, grade: undefined },
        { id: 'iem2-4', code: '22xxxxxxxx', name: 'ESC1', credits: 3, grade: undefined },
        { id: 'iem2-5', code: '22CS1ESPYP', name: 'Introduction to PYTHON Programing', credits: 3, grade: undefined },
        { id: 'iem2-6', code: '22ME2AEIDT', name: 'Innovation and Design Thinking', credits: 1, grade: undefined },
        { id: 'iem2-7', code: '22MA2HSxxx', name: 'Balake/Samskrutika Kannada', credits: 1, grade: undefined },
        { id: 'iem2-8', code: '22MA2AEPWE', name: 'Professional Writing skills in English', credits: 1, grade: undefined },
      ],
      3: [
        { id: 'iem3-1', code: '23MA3BSTFN', name: 'Transform Calculus, Fourier Series And Numerical Techniques', credits: 3, grade: undefined },
        { id: 'iem3-2', code: '23IM3ESEPS', name: 'Elements of Power Systems', credits: 3, grade: undefined },
        { id: 'iem3-3', code: '23IM3PCEMM', name: 'Engineering Materials and Mechanics', credits: 4, grade: undefined },
        { id: 'iem3-4', code: '23IM3PCIME', name: 'Industrial Metrology', credits: 3, grade: undefined },
        { id: 'iem3-5', code: '23IM3PCMAP', name: 'Manufacturing Process', credits: 4, grade: undefined },
        { id: 'iem3-6', code: '23IM3PCCMD', name: 'Computer Aided Machine Drawing', credits: 3, grade: undefined },
        { id: 'iem3-7', code: '23IM3BSBFE', name: 'Biology for Engineers', credits: 1, grade: undefined },
        { id: 'iem3-8', code: '23IM3AEOET', name: 'Overview of Emerging Technologies', credits: 1, grade: undefined },
        { id: 'iem3-9', code: '23NCMC3NS1', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      4: [
        { id: 'iem4-1', code: '23IM4BSSFE', name: 'Statistics for Engineers', credits: 4, grade: undefined },
        { id: 'iem4-2', code: '23IM4ESDME', name: 'Design of Machine Elements', credits: 3, grade: undefined },
        { id: 'iem4-3', code: '23IM4PCINE', name: 'Industrial Engineering and Ergonomics', credits: 4, grade: undefined },
        { id: 'iem4-4', code: '23IM4PCMAE', name: 'Management and Entrepreneurship', credits: 2, grade: undefined },
        { id: 'iem4-5', code: '23IM4PCCIM', name: 'Computers in Manufacturing', credits: 4, grade: undefined },
        { id: 'iem4-6', code: '23IM4PCFPT', name: 'Fundamentals of Programming Tools', credits: 3, grade: undefined },
        { id: 'iem4-7', code: '23MA4AEUHV', name: 'Universal Human Values', credits: 1, grade: undefined },
        { id: 'iem4-8', code: '23IM4AETDP', name: '3D Printing and Design Lab', credits: 1, grade: undefined },
        { id: 'iem4-9', code: '23NCMC4NS1', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      5: [
        { id: 'iem5-1', code: '23IM5PCOPR', name: 'Operations Research', credits: 3, grade: undefined },
        { id: 'iem5-2', code: '23IM5PCHFE', name: 'Human Factors Engineering', credits: 4, grade: undefined },
        { id: 'iem5-3', code: '23IM5PCENE', name: 'Engineering Economics', credits: 3, grade: undefined },
        { id: 'iem5-4', code: '23IM5PCQAR', name: 'Quality Assurance and Reliability', credits: 4, grade: undefined },
        { id: 'iem5-5', code: '23IM5HSEPC', name: 'Environmental Pollution control', credits: 1, grade: undefined },
        { id: 'iem5-6', code: '23IM5PEXXX', name: 'Professional Elective -1', credits: 3, grade: undefined },
        { id: 'iem5-7', code: '23IM5PWMPR', name: 'Mini Project', credits: 2, grade: undefined },
        { id: 'iem5-8', code: '23IM5AERMI', name: 'Research Methodology and IPR', credits: 2, grade: undefined },
        { id: 'iem5-9', code: '23NCMC5NS1', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      6: [
        { id: 'iem6-1', code: '23IM6PCTQM', name: 'Total Quality Management', credits: 2, grade: undefined },
        { id: 'iem6-2', code: '23IM6PCADM', name: 'Advanced Decision Modelling', credits: 4, grade: undefined },
        { id: 'iem6-3', code: '23IM6PCLOM', name: 'Lean and Operations Management', credits: 4, grade: undefined },
        { id: 'iem6-4', code: '23IM6PCFAC', name: 'Financial Accounting and Costing', credits: 2, grade: undefined },
        { id: 'iem6-5', code: '23IM6PEXXX', name: 'Professional Elective -2', credits: 3, grade: undefined },
        { id: 'iem6-6', code: '23IM6OEXXX', name: 'Open Elective -1', credits: 3, grade: undefined },
        { id: 'iem6-7', code: '23IM6PCPW1', name: 'Project Work -1', credits: 2, grade: undefined },
        { id: 'iem6-8', code: '23IM6AEIND', name: 'Industry 5.0', credits: 2, grade: undefined },
        { id: 'iem6-9', code: '23NCMC6NS1', name: 'NSS / YOGA / Physical Edu. (Sports and Athletics)', credits: 0, grade: undefined },
      ],
      7: [
        { id: 'iem7-1', code: '23IM7PCSRP', name: 'Supply Chain Management and ERP', credits: 4, grade: undefined },
        { id: 'iem7-2', code: '23IM7PCRPM', name: 'Project Management', credits: 2, grade: undefined },
        { id: 'iem7-3', code: '23IM7PEXXX', name: 'Professional Elective -3', credits: 3, grade: undefined },
        { id: 'iem7-4', code: '23IM7OEXX', name: 'Open Elective -2', credits: 3, grade: undefined },
        { id: 'iem7-5', code: '23IM7PCPW2', name: 'Project Work-2', credits: 8, grade: undefined },
      ],
      8: [
        { id: 'iem8-1', code: '23IM8PEXXX', name: 'Professional Elective -4', credits: 3, grade: undefined },
        { id: 'iem8-2', code: '23IM8OEXXX', name: 'Open Elective -3', credits: 3, grade: undefined },
        { id: 'iem8-3', code: '23IM8SRINT', name: 'Internship (16-20 weeks)', credits: 6, grade: undefined },
      ],
    },
  };

  // Get branch-specific courses if they exist
  const branchSpecificCourses = branchCourses[branchId]?.[semesterId] || [];

  // Return only branch-specific courses
  return branchSpecificCourses;
};
