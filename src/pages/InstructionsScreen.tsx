
import React from 'react';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calculator, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const InstructionsScreen = () => {
  return (
    <div>
      <PageTitle 
        title="Instructions"
        subtitle="How to use this app"
      />
      
      <div className="space-y-6 slide-in">
        <InstructionStep 
          number={1}
          title="Select Your Branch & Semester"
          description="Choose your branch and semester from the dropdown menus to get the relevant courses."
          icon={<BookOpen size={24} />}
        />
        
        <InstructionStep 
          number={2}
          title="Add Courses & Grades"
          description="Enter your courses with their credit hours and select the grade you received in each course."
          icon={<CheckCircle size={24} />}
        />
        
        <InstructionStep 
          number={3}
          title="Calculate SGPA"
          description="Our system will calculate your Semester Grade Point Average (SGPA) based on your inputs."
          icon={<Calculator size={24} />}
        />
        
        <InstructionStep 
          number={4}
          title="Track CGPA"
          description="Add multiple semesters to calculate and track your Cumulative Grade Point Average (CGPA) over time."
          icon={<BookOpen size={24} />}
        />
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3">Grading System</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2 text-left">Grade</th>
                <th className="pb-2 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              <GradeRow grade="O" points={10} color="text-green-500" />
              <GradeRow grade="A+" points={9} color="text-green-600" />
              <GradeRow grade="A" points={8} color="text-green-700" />
              <GradeRow grade="B+" points={7} color="text-yellow-600" />
              <GradeRow grade="B" points={6} color="text-yellow-700" />
              <GradeRow grade="C" points={5} color="text-orange-500" />
              <GradeRow grade="P" points={4} color="text-orange-700" />
              <GradeRow grade="F" points={0} color="text-red-500" />
            </tbody>
          </table>
        </div>
        
        <Link to="/sgpa">
          <Button className="w-full">
            Get Started <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface InstructionStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InstructionStep: React.FC<InstructionStepProps> = ({ number, title, description, icon }) => {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-app-purple/10 flex items-center justify-center flex-shrink-0">
        <span className="text-app-purple">{icon}</span>
      </div>
      <div>
        <h3 className="font-medium text-gray-800 flex items-center gap-2">
          <span className="text-sm bg-app-purple/10 text-app-purple w-5 h-5 flex items-center justify-center rounded-full">
            {number}
          </span>
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

interface GradeRowProps {
  grade: string;
  points: number;
  color: string;
}

const GradeRow: React.FC<GradeRowProps> = ({ grade, points, color }) => {
  return (
    <tr className="border-b border-gray-50 last:border-b-0">
      <td className={`py-2 text-left font-medium ${color}`}>{grade}</td>
      <td className="py-2 text-right">{points}</td>
    </tr>
  );
};

export default InstructionsScreen;
