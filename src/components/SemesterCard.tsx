
import React from 'react';
import { SemesterResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface SemesterCardProps {
  semesterResult: SemesterResult;
  onRemove: () => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semesterResult, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100 fade-in relative">
      <div className="absolute top-3 right-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onRemove} 
          className="h-8 w-8 text-gray-500 hover:text-red-500"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      
      <h3 className="font-medium text-gray-800">{semesterResult.semesterName}</h3>
      
      <div className="flex items-center justify-between mt-2">
        <div className="bg-app-blue/10 rounded-md px-3 py-1">
          <span className="text-sm text-app-blue">SGPA</span>
          <div className="text-xl font-bold text-app-blue">{semesterResult.sgpa}</div>
        </div>
        
        <div className="bg-gray-100 rounded-md px-3 py-1">
          <span className="text-sm text-gray-700">Credits</span>
          <div className="text-xl font-bold text-gray-700">{semesterResult.totalCredits}</div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Courses:</h4>
        <ul className="text-sm text-gray-600">
          {semesterResult.courses.slice(0, 3).map(course => (
            <li key={course.id} className="flex justify-between">
              <span>{course.name}</span>
              <span className="text-app-blue font-medium">{course.grade}</span>
            </li>
          ))}
          {semesterResult.courses.length > 3 && (
            <li className="text-xs text-gray-500 italic mt-1">
              + {semesterResult.courses.length - 3} more courses
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SemesterCard;
