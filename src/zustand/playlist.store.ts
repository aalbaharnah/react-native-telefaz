import { create } from 'zustand';
import { PlayListItem } from '../lib/types';

interface PlaylistState {
    playlist: PlayListItem[];
    addToPlaylist: (item: PlayListItem) => void;
    updatePlaylist: (item: PlayListItem) => void;
    updatePlaylistItemProgress: (show_id: number, profile_id: number, progress: number) => void;
    removeFromPlaylist: (id: number) => void;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
    playlist: [],
    addToPlaylist: (item) => set((state) => ({
        playlist: [...state.playlist, item],
    })),
    updatePlaylist: (item) => set((state) => ({
        playlist: state.playlist.map(i => i.show_id === item.show_id ? item : i),
    })),
    updatePlaylistItemProgress: (show_id, profile_id, progress) => set((state) => {
        const exists = state.playlist.some(i => i.show_id === show_id);
        if (!exists) {
            // If it doesn't exist, add it
            return {
                playlist: [...state.playlist, {
                    show_id: show_id,
                    profile_id,
                    created_at: new Date().toISOString(),
                    current_time: progress,
                }],
            };
        }

        return {
            playlist: state.playlist.map(i => i.show_id === show_id ? {
                ...i,
                current_time: progress,
                updated_at: new Date().toDateString()
            } : i)
        }
    }),
    removeFromPlaylist: (show_id) => set((state) => ({
        playlist: state.playlist.filter(item => item.show_id !== show_id),
    })),
}));