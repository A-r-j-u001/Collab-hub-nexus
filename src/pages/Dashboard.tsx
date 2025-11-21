import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { listFiles, uploadFile, DriveFile } from '../lib/drive';
import { FileList } from '../components/FileList';
import { UploadButton } from '../components/UploadButton';
import { Layout } from '../components/Layout';

export const Dashboard: React.FC = () => {
    const { accessToken } = useAuth();
    const [files, setFiles] = useState<DriveFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const loadFiles = async () => {
            if (!accessToken) return;
            setIsLoading(true);
            try {
                const data = await listFiles(accessToken);
                setFiles(data);
            } catch (error) {
                console.error('Failed to load files:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadFiles();
    }, [accessToken]);

    const handleUpload = async (file: File) => {
        if (!accessToken) return;
        setIsUploading(true);
        try {
            await uploadFile(accessToken, file);
            // Refresh list manually
            const data = await listFiles(accessToken);
            setFiles(data);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">My Drive</h2>
                <p className="text-slate-400">Manage your files securely</p>
            </div>

            <FileList files={files} isLoading={isLoading} />
            <UploadButton onUpload={handleUpload} isUploading={isUploading} />
        </Layout>
    );
};
