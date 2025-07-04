import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function useNavigationBeforeRemove(fn?: () => void) {
    const navigation = useNavigation();

    useEffect(() => {
        const subscription = navigation.addListener('beforeRemove', (e) => {
            if (fn) fn();
        })

        return () => {
            subscription();
        }
    }, [])
}