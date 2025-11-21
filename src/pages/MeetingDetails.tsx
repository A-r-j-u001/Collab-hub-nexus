import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Meeting, createMeeting, listUpcomingMeetings } from '../lib/calendar';
import { createMeetingNote, updateMeetingNote, getFileContent } from '../lib/drive';
import { NotesEditor } from '../components/NotesEditor';
import { Video, Calendar, Clock, ArrowLeft, Loader2 } from 'lucide-react';

export const MeetingDetails: React.FC = () => {
    const { meetingId } = useParams<{ meetingId: string }>();
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const [notesContent, setNotesContent] = useState('');
    const [notesFileId, setNotesFileId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadMeetingDetails = async () => {
            if (!accessToken || !meetingId) return;

            try {
                const meetings = await listUpcomingMeetings(accessToken);
                const found = meetings.find(m => m.id === meetingId);

                if (found) {
                    setMeeting(found);
                }
            } catch (error) {
                console.error("Failed to load meeting", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMeetingDetails();
    }, [accessToken, meetingId]);

    const handleSaveNotes = async (content: string) => {
        if (!accessToken || !meeting) return;
        setIsSaving(true);
        try {
            if (notesFileId) {
                await updateMeetingNote(accessToken, notesFileId, content);
            } else {
                const file = await createMeetingNote(accessToken, meeting.summary, content);
                setNotesFileId(file.id);
            }
            setNotesContent(content);
        } catch (error) {
            console.error("Failed to save notes", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!meeting) {
        return <div className="text-white">Meeting not found</div>;
    }

    const startTime = new Date(meeting.start.dateTime || meeting.start.date || '');
    const endTime = new Date(meeting.end.dateTime || meeting.end.date || '');

    return (
        <div className="container mx-auto p-6 h-[calc(100vh-80px)] flex flex-col gap-6">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-text-muted hover:text-white transition-colors w-fit"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Meetings
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Meeting Info Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="glass-card p-6">
                        <h1 className="text-2xl font-bold text-white mb-2">{meeting.summary}</h1>
                        <p className="text-text-muted mb-6">{meeting.description}</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-text-muted">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span>{startTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-muted">
                                <Clock className="w-5 h-5 text-primary" />
                                <span>
                                    {startTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} -{' '}
                                    {endTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>

                        {meeting.hangoutLink && (
                            <a
                                href={meeting.hangoutLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg transition-colors font-medium"
                            >
                                <Video className="w-5 h-5" />
                                Join Google Meet
                            </a>
                        )}
                    </div>

                    <div className="glass-card p-6 flex-1">
                        <h3 className="font-semibold text-white mb-4">Attendees</h3>
                        <div className="space-y-2">
                            {meeting.attendees?.map((attendee) => (
                                <div key={attendee.email} className="flex items-center gap-2 text-sm text-text-muted">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    {attendee.email}
                                </div>
                            ))}
                            {(!meeting.attendees || meeting.attendees.length === 0) && (
                                <p className="text-text-muted text-sm">No attendees listed.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notes Area */}
                <div className="lg:col-span-2 h-full">
                    <NotesEditor
                        initialContent={notesContent}
                        onSave={handleSaveNotes}
                        isLoading={isSaving}
                    />
                </div>
            </div>
        </div>
    );
};
