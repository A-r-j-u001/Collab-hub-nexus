import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Video, FileText, Users, Upload, CheckSquare, Calendar, Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import MeetingModule from "@/components/modules/MeetingModule";
import NotesModule from "@/components/modules/NotesModule";
import SocialModule from "@/components/modules/SocialModule";
import ContentModule from "@/components/modules/ContentModule";
import TodoModule from "@/components/modules/TodoModule";

interface DashboardProps {
  onBack: () => void;
}

type ModuleType = 'overview' | 'meetings' | 'notes' | 'social' | 'content' | 'todos';

const Dashboard = ({ onBack }: DashboardProps) => {
  const [activeModule, setActiveModule] = useState<ModuleType>('overview');

  const modules = [
    { id: 'meetings', name: 'Meetings', icon: Video, color: 'meeting', count: '3 active' },
    { id: 'notes', name: 'Notes', icon: FileText, color: 'notes', count: '12 documents' },
    { id: 'social', name: 'Social', icon: Users, color: 'social', count: '5 new updates' },
    { id: 'content', name: 'Content', icon: Upload, color: 'content', count: '8 videos' },
    { id: 'todos', name: 'Tasks', icon: CheckSquare, color: 'todo', count: '7 pending' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'meetings':
        return <MeetingModule />;
      case 'notes':
        return <NotesModule />;
      case 'social':
        return <SocialModule />;
      case 'content':
        return <ContentModule />;
      case 'todos':
        return <TodoModule />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card 
                  key={module.id}
                  className="group hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => setActiveModule(module.id as ModuleType)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg bg-${module.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <module.icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {module.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Access your {module.name.toLowerCase()} and stay productive
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
              
              {/* Quick Actions Card */}
              <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Today
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Start a meeting, create notes, or upload content
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Keep track of your latest actions across all modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Started meeting 'Weekly Standup'", time: "2 minutes ago", type: "meeting" },
                    { action: "Created note 'Project Requirements'", time: "1 hour ago", type: "notes" },
                    { action: "Uploaded video 'Product Demo'", time: "3 hours ago", type: "content" },
                    { action: "Completed task 'Review designs'", time: "1 day ago", type: "todo" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className={`w-2 h-2 rounded-full bg-${activity.type === 'meeting' ? 'meeting' : activity.type === 'notes' ? 'notes' : activity.type === 'content' ? 'content' : 'todo'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2 min-w-0">
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
          <div className="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <Button
                variant={activeModule === 'overview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveModule('overview')}
                className={`${activeModule === 'overview' ? 'bg-gradient-primary text-white' : ''} whitespace-nowrap`}
              >
                Overview
              </Button>
              {modules.map((module) => (
                <Button
                  key={module.id}
                  variant={activeModule === module.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveModule(module.id as ModuleType)}
                  className={`${activeModule === module.id ? `bg-${module.color} text-white` : ''} transition-all duration-200 whitespace-nowrap`}
                >
                  <module.icon className="w-4 h-4 mr-2" />
                  {module.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderModule()}
      </main>
    </div>
  );
};

export default Dashboard;
