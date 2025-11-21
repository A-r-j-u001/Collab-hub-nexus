import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Video, VideoOff, Mic, MicOff, Monitor, Users, Calendar, Clock, Plus, Phone, Trash2 } from "lucide-react";
import { useStore, Meeting } from "@/lib/store";

const MeetingModule = () => {
  const { meetings, addMeeting, deleteMeeting } = useStore();
  const [inMeeting, setInMeeting] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);

  // Schedule meeting state
  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingTime, setNewMeetingTime] = useState("");

  const handleScheduleMeeting = () => {
    if (!newMeetingTitle || !newMeetingDate || !newMeetingTime) return;

    const newMeeting: Meeting = {
      id: crypto.randomUUID(),
      title: newMeetingTitle,
      date: newMeetingDate,
      time: newMeetingTime,
      participants: [], // Mock participants
      type: 'video'
    };

    addMeeting(newMeeting);
    setShowSchedule(false);
    setNewMeetingTitle("");
    setNewMeetingDate("");
    setNewMeetingTime("");
  };

  if (inMeeting) {
    return (
      <div className="space-y-6">
        {/* Meeting Interface */}
        <Card className="bg-gray-900 text-white border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Weekly Standup</CardTitle>
                <CardDescription className="text-gray-300">8 participants • 23:45 elapsed</CardDescription>
              </div>
              <Badge className="bg-red-500 text-white">
                <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                LIVE
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 rounded-lg p-8 mb-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-24 h-24 bg-meeting rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <p className="text-lg text-gray-300">Meeting in progress...</p>
                <p className="text-sm text-gray-400">You are the host</p>
              </div>
            </div>

            {/* Meeting Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={audioOn ? "default" : "destructive"}
                size="lg"
                onClick={() => setAudioOn(!audioOn)}
                className="rounded-full w-12 h-12 p-0"
              >
                {audioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>
              <Button
                variant={videoOn ? "default" : "destructive"}
                size="lg"
                onClick={() => setVideoOn(!videoOn)}
                className="rounded-full w-12 h-12 p-0"
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full w-12 h-12 p-0">
                <Monitor className="w-5 h-5" />
              </Button>
              <Button
                variant="destructive"
                size="lg"
                onClick={() => setInMeeting(false)}
                className="rounded-full w-12 h-12 p-0 bg-red-500 hover:bg-red-600"
              >
                <Phone className="w-5 h-5 rotate-45" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-meeting rounded-lg flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Start Instant Meeting</h3>
            <p className="text-sm text-muted-foreground mb-4">Begin a meeting right now</p>
            <Button
              className="w-full bg-meeting hover:bg-meeting/90 text-white"
              onClick={() => setInMeeting(true)}
            >
              Start Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Schedule Meeting</h3>
            <p className="text-sm text-muted-foreground mb-4">Plan for later</p>
            <Button variant="outline" className="w-full" onClick={() => setShowSchedule(!showSchedule)}>
              {showSchedule ? "Cancel" : "Schedule"}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Join Meeting</h3>
            <p className="text-sm text-muted-foreground mb-4">Enter meeting ID</p>
            <div className="flex space-x-2">
              <Input placeholder="Meeting ID" className="flex-1" />
              <Button onClick={() => setInMeeting(true)}>Join</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Form */}
      {showSchedule && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule a New Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Meeting Title"
                value={newMeetingTitle}
                onChange={(e) => setNewMeetingTitle(e.target.value)}
              />
              <Input
                type="date"
                value={newMeetingDate}
                onChange={(e) => setNewMeetingDate(e.target.value)}
              />
              <Input
                type="time"
                value={newMeetingTime}
                onChange={(e) => setNewMeetingTime(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleScheduleMeeting}>Confirm Schedule</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-meeting" />
            Upcoming Meetings
          </CardTitle>
          <CardDescription>Your scheduled meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No upcoming meetings.</p>
            ) : (
              meetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-meeting rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{meeting.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {meeting.date} at {meeting.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-meeting hover:bg-meeting/90 text-white"
                      onClick={() => setInMeeting(true)}
                    >
                      Join
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => deleteMeeting(meeting.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingModule;