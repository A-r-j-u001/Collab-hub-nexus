import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { listUpcomingMeetings, createMeeting, Meeting } from '../lib/calendar';
import { MeetingCard } from '../components/MeetingCard';
import { CreateMeetingModal } from '../components/CreateMeetingModal';
import { Plus, Loader2, CalendarOff } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadMeetings = async () => {
        if (!accessToken) return;
        setIsLoading(true);
        try {
            const data = await listUpcomingMeetings(accessToken);
            setMeetings(data);
        } catch (error) {
            console.error('Failed to load meetings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMeetings();
    }, [accessToken]);

    const handleCreateMeeting = async (meetingData: any) => {
        if (!accessToken) return;
        try {
            await createMeeting(accessToken, meetingData);
            await loadMeetings(); // Refresh list
        } catch (error) {
            console.error('Failed to create meeting:', error);
        }
    };

    const handleJoinMeeting = (link: string) => {
        window.open(link, '_blank');
    };

    const handleViewNotes = (meeting: Meeting) => {
        navigate(`/meeting/${meeting.id}`);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Meetings</h1>
                    <p className="text-text-muted">Manage your schedule and meeting notes</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    Schedule Meeting
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : meetings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-text-muted glass-card rounded-xl border-dashed border-2 border-white/10">
                    <CalendarOff className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg">No upcoming meetings</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 text-primary hover:underline"
                    >
                        Schedule your first meeting
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                            onJoin={handleJoinMeeting}
                            onViewNotes={handleViewNotes}
                        />
                    ))}
                </div>
            )}

            <CreateMeetingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateMeeting}
            />
        </div>
    );
};
