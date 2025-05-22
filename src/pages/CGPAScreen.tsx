
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/PageTitle';
import { useApp } from '@/context/AppContext';
import AnimatedNumber from '@/components/AnimatedNumber';
import SemesterCard from '@/components/SemesterCard';
import { Plus } from 'lucide-react';

const CGPAScreen = () => {
  const { 
    semesterResults,
    removeSemesterResult,
    calculateCGPA
  } = useApp();
  
  const navigate = useNavigate();
  const cgpa = calculateCGPA();

  const handleAddSemester = () => {
    navigate('/sgpa');
  };
  
  return (
    <div>
      <PageTitle 
        title="CGPA Calculation"
        subtitle="Track your overall academic performance"
      />
      
      {semesterResults.length > 0 ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 slide-in text-center">
            <p className="text-gray-600 mb-1">Your CGPA</p>
            <div className="flex justify-center items-center">
              <AnimatedNumber 
                value={cgpa} 
                className="text-4xl font-bold text-app-purple"
              />
              <span className="text-4xl font-bold text-app-purple">/10</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Based on {semesterResults.length} semester{semesterResults.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <h3 className="font-medium text-gray-700 mb-2">Semester Results</h3>
          
          <div className="space-y-1 mb-6">
            {semesterResults.map((result) => (
              <SemesterCard 
                key={result.semesterId}
                semesterResult={result}
                onRemove={() => removeSemesterResult(result.semesterId)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg mb-6">
          <p className="text-gray-500 mb-4">No semester results found</p>
          <p className="text-sm text-gray-400 max-w-xs mx-auto mb-2">
            Add at least one semester's SGPA to calculate your CGPA
          </p>
        </div>
      )}
      
      <Button 
        onClick={handleAddSemester} 
        className="w-full flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Add Semester
      </Button>
    </div>
  );
};

export default CGPAScreen;
