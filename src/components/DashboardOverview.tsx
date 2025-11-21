import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, FileText, Users, Upload, CheckSquare, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
    const navigate = useNavigate();

    const modules = [
        { id: 'meetings', name: 'Meetings', icon: Video, color: 'meeting', count: '3 active' },
        { id: 'notes', name: 'Notes', icon: FileText, color: 'notes', count: '12 documents' },
        { id: 'social', name: 'Social', icon: Users, color: 'social', count: '5 new updates' },
        { id: 'content', name: 'Content', icon: Upload, color: 'content', count: '8 videos' },
        { id: 'todos', name: 'Tasks', icon: CheckSquare, color: 'todo', count: '7 pending' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <Card
                        key={module.id}
                        className="group hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1"
                        onClick={() => navigate(`/dashboard/${module.id}`)}
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
};

export default DashboardOverview;
