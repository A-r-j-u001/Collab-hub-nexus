import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Plus, Calendar, Users, Flag, Clock, Filter, Search, MoreHorizontal, Trash2 } from "lucide-react";
import { useStore, Task, Priority } from "@/lib/store";
import { format } from "date-fns";

const TodoModule = () => {
  const { tasks, addTask, updateTask, deleteTask } = useStore();
  const [showAddTask, setShowAddTask] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');

  // New task state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskProject, setNewTaskProject] = useState("");

  const projects = Array.from(new Set(tasks.map(t => t.project).filter(Boolean)));

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      case 'overdue':
        return !task.completed && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
      case 'all':
      default:
        return true;
    }
  });

  const handleAddTask = () => {
    if (!newTaskTitle) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      description: newTaskDesc,
      completed: false,
      priority: newTaskPriority,
      dueDate: newTaskDate || new Date().toISOString().split('T')[0],
      assignee: newTaskAssignee || "You",
      project: newTaskProject || "General",
      tags: []
    };

    addTask(newTask);
    setShowAddTask(false);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskPriority("medium");
    setNewTaskDate("");
    setNewTaskAssignee("");
    setNewTaskProject("");
  };

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
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search tasks..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            className="bg-todo hover:bg-todo/90 text-white"
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
                <Input
                  placeholder="Task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <Input
                  placeholder="Description (optional)..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <select
                    className="px-3 py-2 border rounded-md"
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <Input
                    type="date"
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                  />
                  <Input
                    placeholder="Assign to..."
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Project..."
                    className="flex-1"
                    value={newTaskProject}
                    onChange={(e) => setNewTaskProject(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddTask(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-todo hover:bg-todo/90 text-white" onClick={handleAddTask}>
                    Create Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filter Tabs */}
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Tasks', count: tasks.length },
              { key: 'pending', label: 'Pending', count: tasks.filter(t => !t.completed).length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.completed).length },
              { key: 'overdue', label: 'Overdue', count: tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))).length }
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
            {filteredTasks.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No tasks found</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <Card key={task.id} className={`transition-all duration-300 hover:shadow-medium ${task.completed ? 'opacity-60' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) => updateTask(task.id, { completed: !!checked })}
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTask(task.id)}
                              className="text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className={`text-sm mb-3 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                          {task.description}
                        </p>

                        <div className="flex flex-wrap gap-2 items-center justify-between">
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
              ))
            )}
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