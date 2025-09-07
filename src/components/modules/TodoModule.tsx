import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Plus, Calendar, Users, Flag, Clock, Filter, Search, MoreHorizontal } from "lucide-react";

const TodoModule = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');

  const tasks = [
    {
      id: 1,
      title: "Review product requirements document",
      description: "Go through the updated PRD and provide feedback",
      completed: false,
      priority: "high",
      dueDate: "Today",
      assignee: "You",
      project: "Product Launch",
      tags: ["review", "urgent"]
    },
    {
      id: 2,
      title: "Prepare presentation for client meeting",
      description: "Create slides for tomorrow's client presentation",
      completed: false,
      priority: "high",
      dueDate: "Tomorrow",
      assignee: "Sarah J.",
      project: "Client Work",
      tags: ["presentation", "client"]
    },
    {
      id: 3,
      title: "Update user documentation",
      description: "Add new features to the help center",
      completed: true,
      priority: "medium",
      dueDate: "Yesterday",
      assignee: "Mike C.",
      project: "Documentation",
      tags: ["docs", "help"]
    },
    {
      id: 4,
      title: "Conduct user interviews",
      description: "Schedule and conduct 5 user interviews for research",
      completed: false,
      priority: "medium",
      dueDate: "Next week",
      assignee: "Emily R.",
      project: "User Research",
      tags: ["research", "users"]
    },
    {
      id: 5,
      title: "Fix mobile responsive issues",
      description: "Address the layout problems on mobile devices",
      completed: false,
      priority: "low",
      dueDate: "Next month",
      assignee: "Alex T.",
      project: "Bug Fixes",
      tags: ["mobile", "bug"]
    }
  ];

  const projects = [
    { name: "Product Launch", taskCount: 12, completed: 8 },
    { name: "Client Work", taskCount: 8, completed: 5 },
    { name: "Documentation", taskCount: 6, completed: 6 },
    { name: "User Research", taskCount: 10, completed: 7 }
  ];

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      case 'overdue':
        return !task.completed && (task.dueDate === 'Yesterday');
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'low':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Task Management</h2>
          <Badge className="bg-todo text-white">
            {tasks.filter(t => !t.completed).length} pending
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search tasks..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-todo hover:bg-todo/90"
            onClick={() => setShowAddTask(!showAddTask)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Tasks */}
        <div className="lg:col-span-3 space-y-6">
          {/* Add Task Form */}
          {showAddTask && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create New Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Task title..." />
                <Input placeholder="Description (optional)..." />
                <div className="grid md:grid-cols-3 gap-4">
                  <select className="px-3 py-2 border rounded-md">
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                  <Input type="date" />
                  <Input placeholder="Assign to..." />
                </div>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Add tags..." className="flex-1" />
                  <select className="px-3 py-2 border rounded-md">
                    <option>Select Project</option>
                    {projects.map((project, index) => (
                      <option key={index}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddTask(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-todo hover:bg-todo/90">
                    Create Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filter Tabs */}
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All Tasks', count: tasks.length },
              { key: 'pending', label: 'Pending', count: tasks.filter(t => !t.completed).length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.completed).length },
              { key: 'overdue', label: 'Overdue', count: tasks.filter(t => !t.completed && t.dueDate === 'Yesterday').length }
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter(tab.key as any)}
                className={filter === tab.key ? 'bg-todo text-white' : ''}
              >
                {tab.label} ({tab.count})
              </Button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className={`transition-all duration-300 hover:shadow-medium ${task.completed ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox 
                      checked={task.completed} 
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            <Flag className="w-3 h-3 mr-1" />
                            {task.priority}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-3 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {task.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {task.dueDate}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {task.assignee}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {task.project}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CheckSquare className="w-5 h-5 mr-2 text-todo" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Tasks</span>
                  <span className="font-semibold">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-600">{tasks.filter(t => t.completed).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pending</span>
                  <span className="font-semibold text-todo">{tasks.filter(t => !t.completed).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Overdue</span>
                  <span className="font-semibold text-red-600">{tasks.filter(t => !t.completed && t.dueDate === 'Yesterday').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Projects</CardTitle>
              <CardDescription>Task distribution by project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{project.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {project.completed}/{project.taskCount}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-todo h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(project.completed / project.taskCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Team Tasks
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Flag className="w-4 h-4 mr-2" />
                  High Priority
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TodoModule;