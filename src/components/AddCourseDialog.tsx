
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';

interface AddCourseForm {
  courseName: string;
  credits: string;
}

interface AddCourseDialogProps {
  onAddCourse: (name: string, credits: number) => void;
}

const AddCourseDialog: React.FC<AddCourseDialogProps> = ({ onAddCourse }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddCourseForm>();
  const [open, setOpen] = React.useState(false);

  const onSubmit = (data: AddCourseForm) => {
    onAddCourse(data.courseName, parseInt(data.credits));
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Plus size={16} /> Add Custom Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Custom Course</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              placeholder="e.g., Machine Learning"
              {...register("courseName", { required: "Course name is required" })}
            />
            {errors.courseName && (
              <p className="text-sm text-red-500">{errors.courseName.message}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="credits">Credits</Label>
            <Input
              id="credits"
              type="number"
              min="1"
              max="6"
              placeholder="e.g., 4"
              {...register("credits", { 
                required: "Credits are required",
                min: { value: 1, message: "Minimum 1 credit" },
                max: { value: 6, message: "Maximum 6 credits" }
              })}
            />
            {errors.credits && (
              <p className="text-sm text-red-500">{errors.credits.message}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              setOpen(false);
              reset();
            }}>
              Cancel
            </Button>
            <Button type="submit">Add Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseDialog;
