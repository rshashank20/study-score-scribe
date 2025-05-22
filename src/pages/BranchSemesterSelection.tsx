
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/PageTitle';
import { useApp } from '@/context/AppContext';
import { ArrowRight } from 'lucide-react';

const BranchSemesterSelection = () => {
  const { 
    branches, 
    semesters, 
    selectedBranch, 
    selectedSemester,
    setSelectedBranch,
    setSelectedSemester,
    resetCurrentSelection
  } = useApp();
  
  const navigate = useNavigate();

  useEffect(() => {
    // Reset selections when component mounts
    resetCurrentSelection();
  }, []);
  
  const handleContinue = () => {
    if (selectedBranch && selectedSemester) {
      navigate('/course-input');
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      <PageTitle 
        title="Select Branch & Semester" 
        subtitle="Choose your branch and semester to continue" 
      />
      
      <div className="space-y-6 slide-in">
        <div className="space-y-2">
          <label htmlFor="branch-select" className="block text-sm font-medium text-gray-700">
            Branch
          </label>
          <Select 
            value={selectedBranch?.id} 
            onValueChange={(value) => {
              const branch = branches.find(b => b.id === value);
              if (branch) setSelectedBranch(branch);
            }}
          >
            <SelectTrigger id="branch-select" className="w-full">
              <SelectValue placeholder="Select your branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="semester-select" className="block text-sm font-medium text-gray-700">
            Semester
          </label>
          <Select 
            value={selectedSemester?.id.toString()} 
            onValueChange={(value) => {
              const semester = semesters.find(s => s.id === parseInt(value));
              if (semester) setSelectedSemester(semester);
            }}
          >
            <SelectTrigger id="semester-select" className="w-full">
              <SelectValue placeholder="Select your semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id.toString()}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          className="w-full mt-6"
          disabled={!selectedBranch || !selectedSemester}
          onClick={handleContinue}
        >
          Next <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BranchSemesterSelection;
