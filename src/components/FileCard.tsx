import React from 'react';
import { FileText, Image, Folder, MoreVertical, Download, Trash2 } from 'lucide-react';
import { DriveFile } from '../lib/drive';

interface FileCardProps {
    file: DriveFile;
}

export const FileCard: React.FC<FileCardProps> = ({ file }) => {
    const getIcon = () => {
        if (file.mimeType.includes('folder')) return <Folder className="w-8 h-8 text-blue-400" />;
        if (file.mimeType.includes('image')) return <Image className="w-8 h-8 text-purple-400" />;
        return <FileText className="w-8 h-8 text-slate-400" />;
    };

    return (
        <div className="group relative bg-slate-800/50 border border-white/5 rounded-xl p-4 hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/20 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {getIcon()}
                </div>
                <button className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            <h3 className="font-medium text-slate-200 truncate mb-1" title={file.name}>
                {file.name}
            </h3>
            <p className="text-xs text-slate-500">
                {/* Placeholder for size/date as Drive API list needs more fields for this */}
                Modified recently
            </p>

            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/90 backdrop-blur-sm rounded-b-xl flex items-center justify-around border-t border-white/5">
                <button className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
