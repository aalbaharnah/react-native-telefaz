// StateStorage wrpper implementation for React Native using NSUserDefaults for tvOS
import { Settings } from 'react-native';
import { StateStorage } from 'zustand/middleware';

class SettingsStateStorage implements StateStorage {
    getItem(name: string): string | null | Promise<string | null> {
        // Implement the logic to get an item from the settings storage
        return Settings.get(name); // Placeholder
    }

    setItem(name: string, value: string): unknown | Promise<unknown> {
        // Implement the logic to set an item in the settings storage
        return Settings.set({ [name]: value });
    }

    removeItem(name: string): unknown | Promise<unknown> {
        // Implement the logic to remove an item from the settings storage
        return Settings.set({ [name]: undefined })
    }
}

export default new SettingsStateStorage();