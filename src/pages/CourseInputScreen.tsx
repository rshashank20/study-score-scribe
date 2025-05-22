
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/PageTitle';
import { useApp } from '@/context/AppContext';
import CourseCard from '@/components/CourseCard';
import AddCourseDialog from '@/components/AddCourseDialog';
import { Grade } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CourseInputScreen = () => {
  const { 
    courses, 
    selectedBranch, 
    selectedSemester,
    updateCourseGrade, 
    addCustomCourse,
    removeCourse,
    calculateAndSaveSemester
  } = useApp();
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if branch and semester are selected
    if (!selectedBranch || !selectedSemester) {
      navigate('/sgpa');
    }
  }, [selectedBranch, selectedSemester, navigate]);

  const handleCalculate = () => {
    // Check if all courses have grades assigned
    const allGraded = courses.every(course => course.grade);
    
    if (!allGraded) {
      toast({
        title: "Missing grades",
        description: "Please assign grades to all courses before calculating SGPA.",
        variant: "destructive",
      });
      return;
    }
    
    calculateAndSaveSemester();
    navigate('/sgpa-result');
  };

  if (!selectedBranch || !selectedSemester) {
    return null; // Will redirect in useEffect
  }

  return (
    <div>
      <PageTitle 
        title={selectedSemester?.name || 'Course Input'} 
        subtitle={selectedBranch?.name || 'Add your courses and select grades'} 
      />
      
      <div className="space-y-4">
        <div className="mb-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onGradeChange={(grade: Grade) => updateCourseGrade(course.id, grade)}
              onRemove={() => removeCourse(course.id)}
              canRemove={course.id.startsWith('custom')}
            />
          ))}
        </div>
        
        <div className="grid gap-4">
          <AddCourseDialog onAddCourse={addCustomCourse} />
          
          <Button 
            className="w-full" 
            onClick={handleCalculate}
            disabled={courses.length === 0}
          >
            Calculate SGPA <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseInputScreen;
