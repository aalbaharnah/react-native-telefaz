
import { View, StyleSheet, ActivityIndicator, Text, TVFocusGuideView, Button } from 'react-native';
import { useVideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useEffect, useMemo, useState } from 'react';
import { useEvent, useEventListener } from 'expo';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function App() {
    const [loading, setLoading] = useState(true);
    const st = useSharedValue(0);
    const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus>('idle');
    const video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'; // Replace with your video URL

    const player = useVideoPlayer(video_url, (p) => {
        // player.currentTime = 0; // Reset to the beginning if needed
        p.timeUpdateEventInterval = 0.50; // Update every second
        p.play();
    });



    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    useEventListener(player, 'statusChange', ({ status, error }) => {
        setPlayerStatus(status);

        switch (status) {
            case "readyToPlay":
                setLoading(false);
                break;
            case "loading":
                setLoading(true);
                break;
            case "error":
                // Handle error
                break;
            case "idle":
                // Handle idle state
                break;
            default:
                break;
        }

        console.log('Player status changed: ', status);
    });

    const tu = useEvent(player, 'timeUpdate');


    console.log('timeupdate: ', tu?.currentTime, player.duration);

    const duration = player.duration;
    const currentTime = tu?.currentTime || 0;
    let progress = 0
    if (duration) {
        progress = Math.floor((currentTime / duration) * 100);
        st.value = progress;
    }

    const animatedProgress = useAnimatedStyle(() => {
        return {
            width: `${st.value}%`,
            height: '100%',
            backgroundColor: '#f00',
        }
    }, []);


    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                style={styles.video}
                allowsFullscreen
                allowsPictureInPicture
                nativeControls={false}
            />
            <View style={styles.controlsContainer}>

            </View>


            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : null}
            <View style={{ height: 10, width: '100%', backgroundColor: '#efefef', borderRadius: 5, overflow: 'hidden', position: 'absolute', bottom: 30 }}>
                <Animated.View style={animatedProgress} />
            </View>
        </View>
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
    controlsContainer: {
        padding: 10,
    },
});

