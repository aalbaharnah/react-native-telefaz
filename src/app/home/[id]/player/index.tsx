import { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TVFocusGuideView } from 'react-native';
import { Video, ResizeMode, ExponentVideoComponent, AVPlaybackStatus } from 'expo-av';

export default function App() {
    const video = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus | {}>({});
    const [loading, setLoading] = useState<boolean>(true);

    const onLoad = useCallback(() => {
        if (video.current) {
            video.current.playAsync();
        }
        setLoading(false);
    }, [video])

    return (
        <TVFocusGuideView style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('@/assets/videos/284566_small.mp4')}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onLoad={onLoad}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </TVFocusGuideView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',

    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

