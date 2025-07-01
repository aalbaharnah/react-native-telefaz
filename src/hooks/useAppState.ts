import { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';


export default function useAppState(fn?: (nextAppState?: string) => void) {
    const [appState, setAppState] = useState(AppState.currentState);
    const appStateRef = useRef(appState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
                if (fn) fn(nextAppState);
            }
            appStateRef.current = nextAppState;
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
            if (fn) fn(appStateRef.current);
        };
    }, []);

    return appState;
}