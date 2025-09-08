import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Video, VideoOff, Mic, MicOff, Monitor, Users, Calendar, Clock, Plus, Phone } from "lucide-react";

const MeetingModule = () => {
  const [inMeeting, setInMeeting] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const upcomingMeetings = [
    { title: "Weekly Standup", time: "10:00 AM", participants: 8, status: "starting" },
    { title: "Client Presentation", time: "2:00 PM", participants: 12, status: "scheduled" },
    { title: "Design Review", time: "4:30 PM", participants: 5, status: "scheduled" },
  ];

  const recentMeetings = [
    { title: "Project Kickoff", date: "Yesterday", duration: "45 min", participants: 10 },
    { title: "Team Sync", date: "2 days ago", duration: "30 min", participants: 6 },
    { title: "Client Check-in", date: "3 days ago", duration: "60 min", participants: 8 },
  ];

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
                <p className="text-sm text-gray-400">8 participants connected</p>
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
              className="w-full bg-meeting hover:bg-meeting/90"
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
            <Button variant="outline" className="w-full">
              Schedule
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
              <Button>Join</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-meeting" />
            Upcoming Meetings
          </CardTitle>
          <CardDescription>Your scheduled meetings for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-start sm:items-center space-x-4 mb-3 sm:mb-0 w-full sm:w-auto">
                  <div className="w-10 h-10 bg-meeting rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium truncate">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground flex items-center truncate">
                      <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{meeting.time} • {meeting.participants} participants</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  {meeting.status === 'starting' && (
                    <Badge className="bg-green-100 text-green-800">Starting Soon</Badge>
                  )}
                  <Button
                    size="sm"
                    className="bg-meeting hover:bg-meeting/90 w-full sm:w-auto"
                    onClick={() => setInMeeting(true)}
                  >
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-muted-foreground" />
            Recent Meetings
          </CardTitle>
          <CardDescription>View recordings and notes from past meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMeetings.map((meeting, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border hover:bg-secondary/30 transition-colors">
                <div className="flex items-start sm:items-center space-x-4 mb-3 sm:mb-0 w-full sm:w-auto">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium truncate">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">
                      <span className="truncate">{meeting.date} • {meeting.duration} • {meeting.participants} participants</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center items-stretch space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Recording
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Notes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingModule;
