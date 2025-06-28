import { create } from 'zustand';
import { PlayListItem } from '../lib/types';

interface PlaylistState {
    playlist: PlayListItem[];
    addToPlaylist: (item: PlayListItem) => void;
    updatePlaylist: (item: PlayListItem) => void;
    removeFromPlaylist: (id: number) => void;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
    playlist: [],
    addToPlaylist: (item) => set((state) => ({
        playlist: [...state.playlist, item],
    })),
    updatePlaylist: (item) => set((state) => ({
        playlist: state.playlist.map(i => i.id === item.id ? item : i),
    })),
    removeFromPlaylist: (id) => set((state) => ({
        playlist: state.playlist.filter(item => item.id !== id),
    })),
}));