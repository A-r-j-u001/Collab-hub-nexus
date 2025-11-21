import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, FileText, Users, Upload, CheckSquare, Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active module based on current path
  const getActiveModule = () => {
    const path = location.pathname.split('/dashboard/')[1];
    return path || 'overview';
  };

  const activeModule = getActiveModule();

  const modules = [
    { id: 'meetings', name: 'Meetings', icon: Video, color: 'meeting' },
    { id: 'notes', name: 'Notes', icon: FileText, color: 'notes' },
    { id: 'social', name: 'Social', icon: Users, color: 'social' },
    { id: 'content', name: 'Content', icon: Upload, color: 'content' },
    { id: 'todos', name: 'Tasks', icon: CheckSquare, color: 'todo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  CollabHub Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search across all modules..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 mt-4 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={activeModule === 'overview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/dashboard/overview')}
              className={activeModule === 'overview' ? 'bg-gradient-primary text-white' : ''}
            >
              Overview
            </Button>
            {modules.map((module) => (
              <Button
                key={module.id}
                variant={activeModule === module.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate(`/dashboard/${module.id}`)}
                className={`${activeModule === module.id ? `bg-${module.color} text-white` : ''} transition-all duration-200`}
              >
                <module.icon className="w-4 h-4 mr-2" />
                {module.name}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;