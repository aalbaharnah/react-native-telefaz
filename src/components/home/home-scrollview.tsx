import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

import { ThemedView } from '@/src/components/ThemedView';
import { useScale } from '@/src/hooks/useScale';
import ShowPreview from './show-preview';

interface Props extends PropsWithChildren {
    headerBackgroundColor: { dark: string; light: string };
}

export default function HomeScrollView({ children }: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    const styles = useParallaxScrollViewStyles();

    return (
        <ThemedView style={styles.container}>
            <ShowPreview />
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const useParallaxScrollViewStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        content: {
            flex: 1,
            paddingHorizontal: 32 * scale,
            paddingVertical: 16 * scale,
            gap: 16 * scale,
            overflow: 'hidden',
        }
    });
};
