import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';

interface Props extends PropsWithChildren {
    headerBackgroundColor: { dark: string; light: string };
}

export default function HomeScrollView({ children, headerBackgroundColor }: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    const styles = useParallaxScrollViewStyles();

    return (
        <ThemedView style={styles.container}>
            <Animated.View
                style={[
                    styles.header,
                    { backgroundColor: headerBackgroundColor[colorScheme] }
                ]}
            >
                <Animated.Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            </Animated.View>
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
        header: {
            height: 125 * scale,
            overflow: 'hidden',
        },
        content: {
            flex: 1,
            padding: 32 * scale,
            gap: 16 * scale,
            overflow: 'hidden',
        },
        reactLogo: {
            height: 178 * scale,
            width: 290 * scale,
            bottom: 0,
            left: 0,
            position: 'absolute',
        },
    });
};
