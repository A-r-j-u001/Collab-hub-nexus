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
