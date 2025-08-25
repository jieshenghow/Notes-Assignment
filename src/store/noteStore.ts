import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CategoryType = 'work-study' | 'life' | 'health-wellbeing';

export interface Note {
  id: string;
  content: string;
  category: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (
    id: string,
    updates: Partial<Omit<Note, 'id' | 'createdAt'>>,
  ) => void;
  deleteNote: (id: string) => void;
  clearAllNotes: () => void;
  getNotesByCategory: (category: CategoryType) => Note[];
  getAllNotes: () => Note[];
  loadNotes: () => Promise<void>;
}

const STORAGE_KEY = 'notes_storage';

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],

  addNote: async noteData => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedNotes = [...get().notes, newNote];
    set({ notes: updatedNotes });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to save notes to storage:', error);
    }
  },

  updateNote: async (id, updates) => {
    const updatedNotes = get().notes.map(note =>
      note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note,
    );
    set({ notes: updatedNotes });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to save notes to storage:', error);
    }
  },

  deleteNote: async id => {
    const updatedNotes = get().notes.filter(note => note.id !== id);
    set({ notes: updatedNotes });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to save notes to storage:', error);
    }
  },

  clearAllNotes: async () => {
    set({ notes: [] });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('Failed to clear notes from storage:', error);
    }
  },

  loadNotes: async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        set({ notes: parsedNotes });
      }
    } catch (error) {
      console.error('Failed to load notes from storage:', error);
    }
  },

  getNotesByCategory: category => {
    return get().notes.filter(note => note.category === category);
  },

  getAllNotes: () => {
    return get().notes;
  },
}));
