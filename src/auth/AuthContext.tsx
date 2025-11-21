import React, { createContext, useContext, useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin, TokenResponse } from '@react-oauth/google';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: UserProfile | null;
    accessToken: string | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse: TokenResponse) => {
            setAccessToken(tokenResponse.access_token);
            fetchUserProfile(tokenResponse.access_token);
        },
        onError: (error) => console.error('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
    });

    const fetchUserProfile = async (token: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        googleLogout();
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
