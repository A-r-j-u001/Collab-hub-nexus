import React from 'react';
import { Calendar, Clock, Video, FileText } from 'lucide-react';
import { Meeting } from '../lib/calendar';

interface MeetingCardProps {
    meeting: Meeting;
    onJoin: (link: string) => void;
    onViewNotes: (meeting: Meeting) => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onJoin, onViewNotes }) => {
    const startTime = new Date(meeting.start.dateTime || meeting.start.date || '');
    const endTime = new Date(meeting.end.dateTime || meeting.end.date || '');

    const isOngoing = new Date() >= startTime && new Date() <= endTime;

    return (
        <div className={`glass-card p-6 flex flex-col gap-4 ${isOngoing ? 'border-primary/50 shadow-glow' : ''}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{meeting.summary}</h3>
                    <p className="text-text-muted text-sm line-clamp-2">{meeting.description}</p>
                </div>
                {isOngoing && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 animate-pulse">
                        Live Now
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{startTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                        {startTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} -{' '}
                        {endTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                {meeting.hangoutLink && (
                    <button
                        onClick={() => onJoin(meeting.hangoutLink!)}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg transition-colors"
                    >
                        <Video className="w-4 h-4" />
                        Join Meeting
                    </button>
                )}
                <button
                    onClick={() => onViewNotes(meeting)}
                    className="flex-1 flex items-center justify-center gap-2 glass hover:bg-white/5 text-white py-2 px-4 rounded-lg transition-colors"
                >
                    <FileText className="w-4 h-4" />
                    Notes
                </button>
            </div>
        </div>
    );
};
