import React from 'react';
import { FileCard } from './FileCard';
import { DriveFile } from '../lib/drive';
import { Loader2 } from 'lucide-react';

interface FileListProps {
    files: DriveFile[];
    isLoading: boolean;
}

export const FileList: React.FC<FileListProps> = ({ files, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <p className="text-lg">No files found</p>
                <p className="text-sm opacity-60">Upload a file to get started</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
                <FileCard key={file.id} file={file} />
            ))}
        </div>
    );
};
