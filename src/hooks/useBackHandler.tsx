import { useEffect } from 'react';
import { BackHandler } from 'react-native';


export default function useBackHandler(fn?: () => void, disabled = false) {
    useEffect(() => {
        const backAction = () => {
            if (fn) fn();
            return disabled; // Prevent default behavior (exit app)
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => {
            backHandler.remove();
        }
    }, []);

    return null
}