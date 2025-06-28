import * as React from 'react';
import { useEvent } from 'expo';
import { View, StyleSheet } from 'react-native';
import { VideoPlayer } from 'expo-video';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';
import { useScale } from '@/src/hooks/useScale';

interface Props {
    player: VideoPlayer;
}

const ProgressBar = React.forwardRef(({ player }: Props, forwardRef: any) => {
    const st = useSharedValue(0);
    const timeUpdate = useEvent(player, 'timeUpdate');
    const theme = useTheme();
    const styles = useStyles();

    const duration = player.duration;

    if (duration) {
        const currentTime = timeUpdate?.currentTime || 0;
        st.value = withTiming((currentTime / duration) * 100, {
            duration: 100,
            easing: Easing.linear, // Linear easing
        });
    }

    const animatedProgress = useAnimatedStyle(() => {
        return {
            width: `${st.value}%`,
            height: '100%',
            backgroundColor: theme.tint,
            borderRadius: 5,
        }
    }, []);


    return (
        <View style={styles.container}>
            <Animated.View style={animatedProgress} />
        </View>
    );
});

export default React.memo(ProgressBar);


const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            height: scale * 10,
            width: '100%',
            backgroundColor: '#efefef',
            borderRadius: scale * 5
        }
    });
}

