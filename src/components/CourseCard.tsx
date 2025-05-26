import React from 'react';
import { Course, Grade } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onGradeChange: (grade: Grade) => void;
  onRemove?: () => void;
  canRemove?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onGradeChange, onRemove, canRemove = false }) => {
  const gradeOptions: Grade[] = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-3 relative slide-in">
      {canRemove && (
        <button 
          onClick={onRemove}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove course"
        >
          <X size={18} />
        </button>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {course.code}
            </span>
            {course.department && (
              <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded ml-2">
                {course.department}
              </span>
            )}
          </div>
          <h3 className="font-medium mt-1 text-gray-800">{course.name}</h3>
          <div className="flex text-sm text-gray-600 mt-1">
            <span>Credits: {course.credits}</span>
            {course.term && (
              <span className="ml-2">Term: {course.term}</span>
            )}
          </div>
        </div>
        
        <div className="ml-4 w-24">
          <Select
            value={course.grade}
            onValueChange={(value) => onGradeChange(value as Grade)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              {gradeOptions.map(grade => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
