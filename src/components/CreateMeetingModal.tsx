import React, { useState } from 'react';
import { X, Loader2, Plus, Trash2 } from 'lucide-react';

interface CreateMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (meeting: {
        summary: string;
        description: string;
        startTime: string;
        endTime: string;
        attendees: string[];
    }) => Promise<void>;
}

export const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('60'); // minutes
    const [attendeeInput, setAttendeeInput] = useState('');
    const [attendees, setAttendees] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleAddAttendee = (e: React.FormEvent) => {
        e.preventDefault();
        if (attendeeInput && !attendees.includes(attendeeInput)) {
            setAttendees([...attendees, attendeeInput]);
            setAttendeeInput('');
        }
    };

    const removeAttendee = (email: string) => {
        setAttendees(attendees.filter((a) => a !== email));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const startDateTime = new Date(`${date}T${time}`);
        const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

        try {
            await onSubmit({
                summary,
                description,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                attendees,
            });
            onClose();
            // Reset form
            setSummary('');
            setDescription('');
            setAttendees([]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="glass-card w-full max-w-lg p-6 m-4 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-white">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">Schedule Meeting</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-text-muted mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full bg-surface/50 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
                            placeholder="Weekly Sync"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-muted mb-1">Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-surface/50 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary [color-scheme:dark]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-text-muted mb-1">Time</label>
                            <input
                                type="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-surface/50 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-text-muted mb-1">Duration (minutes)</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-surface/50 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
                        >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-text-muted mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-surface/50 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary h-24 resize-none"
                            placeholder="Meeting agenda..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-text-muted mb-1">Attendees</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="email"
                                value={attendeeInput}
                                onChange={(e) => setAttendeeInput(e.target.value)}
                                className="flex-1 bg-surface/50 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
                                placeholder="colleague@example.com"
                            />
                            <button
                                type="button"
                                onClick={handleAddAttendee}
                                className="bg-surface hover:bg-surface-hover text-white p-2 rounded-md transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {attendees.map((email) => (
                                <span key={email} className="flex items-center gap-1 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full border border-primary/30">
                                    {email}
                                    <button type="button" onClick={() => removeAttendee(email)} className="hover:text-white">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Schedule Meeting'}
                    </button>
                </form>
            </div>
        </div>
    );
};
