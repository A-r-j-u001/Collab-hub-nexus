import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, FileText, Users, Upload, CheckSquare, Calendar, Play, MessageCircle } from "lucide-react";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('landing')} />;
  }

  const features = [
    {
      icon: Video,
      title: "Live Meetings",
      description: "Host and join meetings with screen sharing, recording, and real-time collaboration",
      color: "meeting",
      gradient: "from-meeting to-blue-600"
    },
    {
      icon: FileText,
      title: "Smart Notes",
      description: "Take live meeting notes with AI transcription, formatting, and automatic organization",
      color: "notes",
      gradient: "from-notes to-yellow-600"
    },
    {
      icon: Users,
      title: "Social Network",
      description: "Connect with colleagues, share updates, and build professional relationships",
      color: "social",
      gradient: "from-social to-green-600"
    },
    {
      icon: Upload,
      title: "Content Studio",
      description: "Upload, manage, and share videos, documents, and presentations",
      color: "content",
      gradient: "from-content to-purple-600"
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Organize tasks, set deadlines, and track progress across all your projects",
      color: "todo",
      gradient: "from-todo to-red-600"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered scheduling that finds the perfect time for everyone",
      color: "primary",
      gradient: "from-primary to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CollabHub
            </h1>
          </div>
          <Button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-medium"
          >
            Launch Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-gradient-primary text-white">
            🚀 All-in-One Collaboration Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-content bg-clip-text text-transparent">
            Meet, Create, Share
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The ultimate platform combining video meetings, note-taking, social networking, and content management in one beautiful interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('dashboard')}
              className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-large text-lg px-8 py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              <MessageCircle className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary/30 to-accent/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Six powerful tools working together to supercharge your productivity and collaboration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-0 shadow-soft"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-primary rounded-3xl p-8 sm:p-12 text-white text-center flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of teams already using CollabHub to work smarter, not harder.
            </p>
            <Button 
              size="lg" 
              onClick={() => setCurrentView('dashboard')}
              className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 text-lg px-8 py-3"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 CollabHub. Built with ❤️ for modern teams.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
