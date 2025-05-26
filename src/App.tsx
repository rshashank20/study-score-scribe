import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Layouts
import AppLayout from "./components/AppLayout";

// Pages
import WelcomeScreen from "./pages/WelcomeScreen";
import BranchSemesterSelection from "./pages/BranchSemesterSelection";
import CourseInputScreen from "./pages/CourseInputScreen";
import SGPAResultScreen from "./pages/SGPAResultScreen";
import CGPAScreen from "./pages/CGPAScreen";
import InstructionsScreen from "./pages/InstructionsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/sgpa" element={<BranchSemesterSelection />} />
              <Route path="/course-input" element={<CourseInputScreen />} />
              <Route path="/sgpa-result" element={<SGPAResultScreen />} />
              <Route path="/cgpa" element={<CGPAScreen />} />
              <Route path="/instructions" element={<InstructionsScreen />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
