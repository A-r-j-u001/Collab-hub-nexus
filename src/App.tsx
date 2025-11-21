import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./components/Dashboard";
import MeetingModule from "./components/modules/MeetingModule";
import NotesModule from "./components/modules/NotesModule";
import SocialModule from "./components/modules/SocialModule";
import ContentModule from "./components/modules/ContentModule";
import TodoModule from "./components/modules/TodoModule";
import NotFound from "./pages/NotFound";
import DashboardOverview from "./components/DashboardOverview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="meetings" element={<MeetingModule />} />
            <Route path="notes" element={<NotesModule />} />
            <Route path="social" element={<SocialModule />} />
            <Route path="content" element={<ContentModule />} />
            <Route path="todos" element={<TodoModule />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
