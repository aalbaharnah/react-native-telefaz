import { create } from 'zustand';
import { Show } from '../lib/types';

interface FocusedShowState {
    focusedShow: Show | null;
    setFocusedShow: (show: Show | null) => void;
}

export const useFocusedShowStore = create<FocusedShowState>((set) => ({
    focusedShow: null,
    setFocusedShow: (show) => set({ focusedShow: show }),
}));