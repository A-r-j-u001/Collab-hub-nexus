import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  assignee: string;
  project: string;
  tags: string[];
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  type: 'video' | 'audio';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  tags: string[];
}

export interface SocialPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document';
  url: string;
  uploadDate: string;
}

interface AppState {
  tasks: Task[];
  meetings: Meeting[];
  notes: Note[];
  socialPosts: SocialPost[];
  contentItems: ContentItem[];
  
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  addMeeting: (meeting: Meeting) => void;
  deleteMeeting: (id: string) => void;
  
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  
  addSocialPost: (post: SocialPost) => void;
  likePost: (id: string) => void;
  
  addContentItem: (item: ContentItem) => void;
  deleteContentItem: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [
         {
          id: '1',
          title: "Review product requirements document",
          description: "Go through the updated PRD and provide feedback",
          completed: false,
          priority: "high",
          dueDate: new Date().toISOString().split('T')[0],
          assignee: "You",
          project: "Product Launch",
          tags: ["review", "urgent"]
        }
      ],
      meetings: [],
      notes: [],
      socialPosts: [],
      contentItems: [],

      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      addMeeting: (meeting) => set((state) => ({ meetings: [...state.meetings, meeting] })),
      deleteMeeting: (id) => set((state) => ({ meetings: state.meetings.filter((m) => m.id !== id) })),

      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
      })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

      addSocialPost: (post) => set((state) => ({ socialPosts: [post, ...state.socialPosts] })),
      likePost: (id) => set((state) => ({
        socialPosts: state.socialPosts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
      })),

      addContentItem: (item) => set((state) => ({ contentItems: [...state.contentItems, item] })),
      deleteContentItem: (id) => set((state) => ({ contentItems: state.contentItems.filter((i) => i.id !== id) })),
    }),
    {
      name: 'collab-hub-storage',
    }
  )
);
