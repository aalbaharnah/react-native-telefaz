import { create } from 'zustand';
import { Show } from '../lib/types';

interface FavoritesState {
    favorites: Show[];
    setFavorites: (show: Show) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    setFavorites: (show) => set((state) => {
        if (state.favorites.some(favorite => favorite.id === show.id)) {
            return { favorites: state.favorites.filter(favorite => favorite.id !== show.id) };
        }
        return { favorites: [...state.favorites, show] };
    }),
}));