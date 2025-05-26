import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/PageTitle';
import { useApp } from '@/context/AppContext';
import AnimatedNumber from '@/components/AnimatedNumber';
import { ArrowRight, Plus } from 'lucide-react';

const SGPAResultScreen = () => {
  const { 
    selectedSemester,
    semesterResults,
    resetCurrentSelection
  } = useApp();
  
  const navigate = useNavigate();

  // Find the current semester result
  const currentResult = selectedSemester ? 
    semesterResults.find(result => result.semesterId === selectedSemester.id) : 
    null;

  useEffect(() => {
    // If no result is available, redirect to SGPA page
    if (!currentResult) {
      navigate('/sgpa');
    }
  }, [currentResult, navigate]);

  const handleAddAnotherSemester = () => {
    resetCurrentSelection();
    navigate('/sgpa');
  };

  const handleViewCGPA = () => {
    navigate('/cgpa');
  };

  if (!currentResult) {
    return null; // Will redirect in useEffect
  }

  const getLetterGradeColor = (grade: string | undefined) => {
    switch (grade) {
      case 'O': return 'text-green-500';
      case 'A+': return 'text-green-600';
      case 'A': return 'text-green-700';
      case 'B+': return 'text-yellow-600';
      case 'B': return 'text-yellow-700';
      case 'C': return 'text-orange-500';
      case 'P': return 'text-orange-700';
      case 'F': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div>
      <PageTitle 
        title="SGPA Result"
        subtitle={`${currentResult.semesterName} Results`}
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 slide-in">
        <div className="text-center mb-4">
          <p className="text-gray-600 mb-1">Your SGPA</p>
          <div className="flex justify-center items-center">
            <AnimatedNumber 
              value={currentResult.sgpa} 
              className="text-4xl font-bold text-app-blue"
              formatValue={val => val.toFixed(2)}
            />
            <span className="text-4xl font-bold text-app-blue">/10</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Total Credits: {currentResult.totalCredits}
          </p>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <h3 className="font-medium text-gray-700 mb-3">Course Breakdown</h3>
          
          <div className="max-h-64 overflow-y-auto pr-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-2 text-left">Course</th>
                  <th className="pb-2 text-center">Credits</th>
                  <th className="pb-2 text-right">Grade</th>
                </tr>
              </thead>
              <tbody>
                {currentResult.courses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-50 last:border-b-0">
                    <td className="py-2 text-left">{course.name}</td>
                    <td className="py-2 text-center">{course.credits}</td>
                    <td className={`py-2 text-right font-medium ${getLetterGradeColor(course.grade)}`}>
                      {course.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="grid gap-3">
        <Button onClick={handleAddAnotherSemester} variant="outline" className="w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Add Another Semester
        </Button>
        <Button onClick={handleViewCGPA} className="w-full flex items-center justify-center gap-2">
          View CGPA <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SGPAResultScreen;
