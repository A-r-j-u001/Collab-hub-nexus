# CollabHub Nexus - Meeting Management App

A secure, client-side meeting management application built with React, Google Calendar API, and Google Drive API.

## Features

- **Meeting Scheduling**: Schedule meetings directly to your Google Calendar.
- **Secure Notes**: Take meeting notes that are automatically saved to your Google Drive.
- **Google Meet Integration**: One-click access to video calls.
- **Dashboard**: View upcoming meetings and "Live Now" status.

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS (v4), Glassmorphism UI
- **Auth**: Google OAuth 2.0 (@react-oauth/google)
- **APIs**: Google Calendar API, Google Drive API

## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file with your Google Client ID:
    ```env
    VITE_GOOGLE_CLIENT_ID=your_client_id_here
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## License

MIT
