import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../lib/types';

interface ProfileState {
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileState>()(persist((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
}), {
    name: 'profile-storage', // unique name for the storage
}));