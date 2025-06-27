import { useState, useRef } from 'react';
import { View, StyleSheet, Button, Pressable, Text, TVFocusGuideView } from 'react-native';
import { Video, ResizeMode, ExponentVideoComponent, AVPlaybackStatus } from 'expo-av';

export default function App() {
    const video = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus | {}>({});

    return (
        <TVFocusGuideView style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('@/assets/videos/284566_small.mp4')}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            {/* <TVFocusGuideView style={styles.buttons}>
                <Pressable
                    style={(state) => [
                        {
                            backgroundColor: state.focused ? '#ccc' : '#f1f1f1',
                            padding: 10,
                            borderRadius: 5,
                            margin: 5,
                        },
                        state.pressed && { transform: [{ scale: 0.95 }] }
                    ]}
                    onPress={() =>
                        status?.isPlaying ? video?.current?.pauseAsync() : video?.current?.playAsync()
                    }
                >
                    <Text>{"Play"}</Text>
                </Pressable>
            </TVFocusGuideView> */}
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

