import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../lib/types';
import { storage } from '@/src/zustand/storage';

interface ProfileState {
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileState>()(persist((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
}), {
    name: 'profile-storage', // unique name for the storage
    storage
}));