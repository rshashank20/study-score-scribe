// Types for stored data
export interface StoredData {
  courses: any[];
  semesterResults: any[];
  settings: {
    notifications: boolean;
    userName?: string;
    userEmail?: string;
  };
}

// Storage keys
const STORAGE_KEYS = {
  COURSES: 'study-score-courses',
  SEMESTER_RESULTS: 'study-score-semester-results',
  SETTINGS: 'study-score-settings',
} as const;

// Helper to safely parse JSON
const safeParseJSON = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper to safely stringify and save data
const safeSaveJSON = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Storage functions
export const storage = {
  // Courses
  getCourses: () => safeParseJSON(STORAGE_KEYS.COURSES, []),
  saveCourses: (courses: any[]) => safeSaveJSON(STORAGE_KEYS.COURSES, courses),

  // Semester Results
  getSemesterResults: () => safeParseJSON(STORAGE_KEYS.SEMESTER_RESULTS, []),
  saveSemesterResults: (results: any[]) => safeSaveJSON(STORAGE_KEYS.SEMESTER_RESULTS, results),

  // Settings
  getSettings: () => safeParseJSON(STORAGE_KEYS.SETTINGS, { notifications: true }),
  saveSettings: (settings: any) => safeSaveJSON(STORAGE_KEYS.SETTINGS, settings),

  // Clear all data
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
}; 