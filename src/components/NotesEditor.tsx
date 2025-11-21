import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface NotesEditorProps {
    initialContent: string;
    onSave: (content: string) => Promise<void>;
    isLoading?: boolean;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ initialContent, onSave, isLoading = false }) => {
    const [content, setContent] = useState(initialContent);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsDirty(true);
    };

    const handleSave = async () => {
        await onSave(content);
        setIsDirty(false);
    };

    return (
        <div className="flex flex-col h-full glass-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-surface/50">
                <h3 className="font-semibold text-white">Meeting Notes</h3>
                <button
                    onClick={handleSave}
                    disabled={!isDirty || isLoading}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${isDirty
                            ? 'bg-primary hover:bg-primary-hover text-white'
                            : 'bg-surface text-text-muted cursor-not-allowed'
                        }`}
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isDirty ? 'Save Changes' : 'Saved'}
                </button>
            </div>
            <textarea
                value={content}
                onChange={handleChange}
                className="flex-1 w-full bg-transparent p-4 text-text resize-none focus:outline-none font-mono text-sm leading-relaxed"
                placeholder="Type your meeting notes here..."
            />
        </div>
    );
};
