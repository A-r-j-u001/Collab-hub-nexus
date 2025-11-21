const CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3';

export interface Meeting {
    id: string;
    summary: string;
    description?: string;
    start: { dateTime?: string; date?: string; timeZone?: string };
    end: { dateTime?: string; date?: string; timeZone?: string };
    hangoutLink?: string; // Google Meet link
    attendees?: { email: string; responseStatus?: string }[];
}

export const listUpcomingMeetings = async (accessToken: string): Promise<Meeting[]> => {
    try {
        const response = await fetch(
            `${CALENDAR_API_BASE}/calendars/primary/events?timeMin=${new Date().toISOString()}&singleEvents=true&orderBy=startTime&maxResults=20`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.items || [];
    } catch (error) {
        console.error('Error listing meetings:', error);
        throw error;
    }
};

export const createMeeting = async (
    accessToken: string,
    meeting: {
        summary: string;
        description: string;
        startTime: string;
        endTime: string;
        attendees: string[];
    }
) => {
    const event = {
        summary: meeting.summary,
        description: meeting.description,
        start: {
            dateTime: meeting.startTime,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
            dateTime: meeting.endTime,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: meeting.attendees.map((email) => ({ email })),
        conferenceData: {
            createRequest: {
                requestId: Math.random().toString(36).substring(7),
                conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
        },
    };

    try {
        const response = await fetch(
            `${CALENDAR_API_BASE}/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data;
    } catch (error) {
        console.error('Error creating meeting:', error);
        throw error;
    }
};
