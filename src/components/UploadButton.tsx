import React, { useRef } from 'react';
import { Plus } from 'lucide-react';

interface UploadButtonProps {
    onUpload: (file: File) => void;
    isUploading: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onUpload, isUploading }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
            />
            <button
                onClick={handleClick}
                disabled={isUploading}
                className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed z-40"
            >
                <Plus className={`w-6 h-6 ${isUploading ? 'animate-spin' : ''}`} />
            </button>
        </>
    );
};
