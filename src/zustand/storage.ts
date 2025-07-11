// use sessionStorage for web
// and NSUserDefaults for tvOS
// and @react-native-async-storage/async-storage for other platforms
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from '@/src/zustand/settings-state-storage';
import { createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';

export const storage = Platform.OS === 'web' ? createJSONStorage(() => sessionStorage) :
    (Platform.isTVOS) ? createJSONStorage(() => Settings) :
        createJSONStorage(() => AsyncStorage);