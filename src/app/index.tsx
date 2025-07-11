
import * as React from 'react';
import { View, StyleSheet } from "react-native";
import { router } from 'expo-router';
import { useTheme } from '@/src/hooks/useTheme';
import { useScale } from '@/src/hooks/useScale';
import { useProfileStore } from '@/src/zustand/profile.store';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { wasLoggedInRecently } from '../lib/utils';

export default function HomeScreen() {
    const theme = useTheme();
    const styles = useStyles();
    const profile = useProfileStore(s => s.profile);

    React.useEffect(() => {
        setTimeout(() => {
            // Simulate loading delay
            onAnimationCompleted();
        }, 700)
    }, [])

    const onAnimationCompleted = () => {
        if (profile && profile.id && wasLoggedInRecently(profile.login_at)) {
            router.push('/home');
            return;
        }
        router.push('/profiles');
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Animated.Text entering={FadeInDown} style={styles.salter}>{"🧂"}</Animated.Text>
        </View>
    );
};

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        salter: {
            fontSize: 128 * scale,
            color: '#fff',
        }
    });
}