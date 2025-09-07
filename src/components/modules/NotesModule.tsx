import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Search, Star, Clock, Users, Mic, Save, Share } from "lucide-react";

const NotesModule = () => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const notes = [
    {
      id: 1,
      title: "Project Requirements Meeting",
      preview: "Key points from client discussion about new features...",
      date: "2 hours ago",
      tags: ["meeting", "requirements"],
      starred: true,
      shared: true
    },
    {
      id: 2,
      title: "Design System Guidelines",
      preview: "Color palette, typography, and component specifications...",
      date: "1 day ago",
      tags: ["design", "guidelines"],
      starred: false,
      shared: false
    },
    {
      id: 3,
      title: "Weekly Team Standup",
      preview: "Team progress updates and blockers discussed...",
      date: "2 days ago",
      tags: ["standup", "team"],
      starred: true,
      shared: true
    },
    {
      id: 4,
      title: "Client Feedback Notes",
      preview: "User testing results and improvement suggestions...",
      date: "3 days ago",
      tags: ["feedback", "client"],
      starred: false,
      shared: false
    },
  ];

  const currentNote = selectedNote ? notes.find(n => n.id === selectedNote) : null;

  if (selectedNote && currentNote) {
    return (
      <div className="space-y-6">
        {/* Note Editor Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedNote(null)}>
            ← Back to Notes
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? "animate-pulse" : ""}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isRecording ? "Stop Recording" : "Voice Notes"}
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-notes hover:bg-notes/90">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Note Editor */}
        <Card>
          <CardHeader className="border-b">
            <Input 
              value={currentNote.title}
              className="text-2xl font-bold border-0 p-0 focus:ring-0 bg-transparent"
              placeholder="Note title..."
            />
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {currentNote.date}
              </span>
              {currentNote.shared && (
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Shared
                </span>
              )}
              <div className="flex space-x-1">
                {currentNote.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Textarea 
              placeholder="Start typing your notes here..."
              className="min-h-[500px] border-0 p-0 focus:ring-0 resize-none text-base leading-relaxed"
              defaultValue={`# ${currentNote.title}

## Meeting Overview
${currentNote.preview}

## Key Points
- Important discussion about project timeline
- Budget considerations and resource allocation
- Next steps and action items identified
- Client feedback incorporated into requirements

## Action Items
- [ ] Review technical specifications
- [ ] Prepare wireframes for next meeting
- [ ] Schedule follow-up with stakeholders
- [ ] Document final requirements

## Notes
The client emphasized the importance of user experience and requested additional features for accessibility. We discussed the implementation timeline and agreed on a phased approach.

---
*Meeting recorded and transcribed automatically*`}
            />
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-gradient-to-r from-notes/10 to-yellow-100/50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center">
              <div className="w-5 h-5 rounded-full bg-notes flex items-center justify-center mr-2">
                <span className="text-white text-xs">AI</span>
              </div>
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">💡 Consider adding a summary section at the top</p>
              <p className="text-sm">📅 Would you like to create calendar events for the action items?</p>
              <p className="text-sm">🔗 Related notes: "Design System Guidelines", "Client Feedback Notes"</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Notes</h2>
          <Badge className="bg-notes text-white">
            {notes.length} documents
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search notes..." className="pl-10 w-64" />
          </div>
          <Button className="bg-notes hover:bg-notes/90">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {/* Quick Create Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-notes rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Blank Note</h3>
            <p className="text-sm text-muted-foreground">Start with a clean slate</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-meeting rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Voice Note</h3>
            <p className="text-sm text-muted-foreground">Record and transcribe</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Meeting Notes</h3>
            <p className="text-sm text-muted-foreground">Template for meetings</p>
          </CardContent>
        </Card>
      </div>

      {/* Notes List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notes</CardTitle>
          <CardDescription>Your latest documents and meeting notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note) => (
              <div 
                key={note.id}
                className="flex items-start justify-between p-4 rounded-lg border hover:bg-secondary/30 transition-colors cursor-pointer"
                onClick={() => setSelectedNote(note.id)}
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-10 bg-notes rounded-lg flex items-center justify-center mt-1">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{note.title}</h4>
                      {note.starred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {note.shared && (
                        <Users className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{note.preview}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {note.date}
                      </span>
                      <div className="flex space-x-1">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesModule;