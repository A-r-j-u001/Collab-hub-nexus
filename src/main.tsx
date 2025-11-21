import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './auth/AuthContext';
import App from './App.tsx';
import './styles/index.css';

// TODO: Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "939715583308-mnh42q2pmgn8tj6ec5prnc29cfh20c8p.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);
