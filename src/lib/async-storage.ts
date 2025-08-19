// PostHogCustomStorage wrpper implementation for React Native using NSUserDefaults for tvOS
import { PostHogCustomStorage } from 'posthog-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings, Platform } from 'react-native';


class PostHogCustomStoragePolyfil implements PostHogCustomStorage {
    getItem(name: string): string | null | Promise<string | null> {
        if (Platform.isTVOS) {
            return Settings.get(name); // Placeholder
        }
        return AsyncStorage.getItem(name);
    }

    setItem(name: string, value: string): void | Promise<void> {
        // Implement the logic to set an item in the settings storage
        if (Platform.isTVOS) {
            return Settings.set({ [name]: value });
        }
        return AsyncStorage.setItem(name, value);
    }


}

export default new PostHogCustomStoragePolyfil();