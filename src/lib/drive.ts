export interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    thumbnailLink?: string;
    webViewLink?: string;
    iconLink?: string;
}

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';

export const listFiles = async (accessToken: string): Promise<DriveFile[]> => {
    try {
        const response = await fetch(
            `${DRIVE_API_BASE}/files?fields=files(id,name,mimeType,thumbnailLink,webViewLink,iconLink)&q=trashed=false`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.files || [];
    } catch (error) {
        console.error('Error listing files:', error);
        throw error;
    }
};

export const uploadFile = async (accessToken: string, file: File) => {
    const metadata = {
        name: file.name,
        mimeType: file.type,
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    try {
        const response = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: form,
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const initAppData = async (accessToken: string) => {
    // Check for existing app data folder or create one
    // This is a placeholder for the "backend data" requirement
    console.log("Initializing App Data storage...");
};

export const createMeetingNote = async (accessToken: string, title: string, content: string) => {
    const metadata = {
        name: `${title} - Notes`,
        mimeType: 'application/vnd.google-apps.document', // Google Doc
    };

    // For simple text files, we can use 'text/plain'
    // But user requested "notes saving", let's use a simple text file for now to allow easy editing in-app
    // Or we can create a Google Doc. Let's stick to text/plain for in-app editing simplicity first.

    const fileMetadata = {
        name: `${title}_notes.txt`,
        mimeType: 'text/plain',
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
    form.append('file', new Blob([content], { type: 'text/plain' }));

    try {
        const response = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: form,
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

export const updateMeetingNote = async (accessToken: string, fileId: string, content: string) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'text/plain'
                },
                body: content
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
};

export const getFileContent = async (accessToken: string, fileId: string) => {
    try {
        const response = await fetch(
            `${DRIVE_API_BASE}/files/${fileId}?alt=media`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (!response.ok) throw new Error('Failed to fetch file content');
        return await response.text();
    } catch (error) {
        console.error('Error getting file content:', error);
        throw error;
    }
};
