// lib/async-storage.ts
// This file provides utility functions to interact with AsyncStorage in a React Native application.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isJsonString } from './utils';

export async function getStorage<T>(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return (isJsonString(value) ? JSON.parse(value) : value) as T;
        }
        return null;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function setStorage<T>(key: string, value: T) {
    try {
        const jsonValue = typeof value !== 'string' ? JSON.stringify(value) : value;
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function removeFromStorage(key: string) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function clearStorage() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        throw new Error(error.message);
    }
}
