import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Search, Star, Clock, Users, Mic, Save, Share, Trash2 } from "lucide-react";
import { useStore, Note } from "@/lib/store";

const NotesModule = () => {
  const { notes, addNote, updateNote, deleteNote } = useStore();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Editor state
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const currentNote = selectedNoteId ? notes.find(n => n.id === selectedNoteId) : null;

  const handleNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      lastModified: new Date().toISOString().split('T')[0],
      tags: []
    };
    addNote(newNote);
    setSelectedNoteId(newNote.id);
    setEditorTitle(newNote.title);
    setEditorContent(newNote.content);
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setEditorTitle(note.title);
    setEditorContent(note.content);
  };

  const handleSaveNote = () => {
    if (selectedNoteId) {
      updateNote(selectedNoteId, {
        title: editorTitle,
        content: editorContent,
        lastModified: new Date().toISOString().split('T')[0]
      });
    }
  };

  if (selectedNoteId && currentNote) {
    return (
      <div className="space-y-6">
        {/* Note Editor Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedNoteId(null)}>
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
            <Button size="sm" className="bg-notes hover:bg-notes/90 text-white" onClick={handleSaveNote}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Note Editor */}
        <Card>
          <CardHeader className="border-b">
            <Input
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
              className="text-2xl font-bold border-0 p-0 focus:ring-0 bg-transparent"
              placeholder="Note title..."
            />
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {currentNote.lastModified}
              </span>
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
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
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
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search notes..." className="pl-10 w-64" />
          </div>
          <Button className="bg-notes hover:bg-notes/90 text-white" onClick={handleNewNote}>
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {/* Quick Create Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card
          className="hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1"
          onClick={handleNewNote}
        >
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
            {notes.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No notes yet.</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between p-4 rounded-lg border hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => handleSelectNote(note)}
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-notes rounded-lg flex items-center justify-center mt-1">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{note.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{note.content || "No content"}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {note.lastModified}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesModule;