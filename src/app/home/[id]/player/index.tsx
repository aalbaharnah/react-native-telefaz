
import { View, StyleSheet, ActivityIndicator, Text, TVFocusGuideView, Button } from 'react-native';
import { useVideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useEvent, useEventListener } from 'expo';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import FocusableBox from '@/src/components/focusable-box';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
    const [destinationItem, setDestinationItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const st = useSharedValue(0);
    const focusGuideRef = useRef<React.ElementRef<typeof TVFocusGuideView>>(null);
    const destinationItemRef = useRef<any>(null);
    const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus>('idle');


    const video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'; // Replace with your video URL

    const player = useVideoPlayer(video_url, (p) => {
        // player.currentTime = 0; // Reset to the beginning if needed
        p.timeUpdateEventInterval = 0.50; // Update every second
        p.play();
    });


    useEffect(() => {
        focusGuideRef.current?.setDestinations([destinationItemRef.current]);
    }, []);

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

    const onForward = () => {
        if (player.currentTime + 10 < player.duration) {
            player.currentTime += 10;
        } else {
            player.currentTime = player.duration;
        }
    }

    const onRewind = () => {
        if (player.currentTime - 10 > 0) {
            player.currentTime -= 10;
        } else {
            player.currentTime = 0;
        }
    }

    const onPlayPause = () => {
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    }


    return (

        <View style={styles.container}>
            <TVFocusGuideView
                autoFocus
                focusable={false}
                importantForAccessibility='no-hide-descendants'
            >
                <VideoView
                    player={player}
                    style={styles.video}
                    allowsFullscreen
                    allowsPictureInPicture
                    nativeControls={false}
                />
            </TVFocusGuideView>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : null}

            <View style={{ height: 10, width: '100%', backgroundColor: '#efefef', borderRadius: 5, overflow: 'hidden', position: 'absolute', bottom: 100, }}>
                <Animated.View style={animatedProgress} />
            </View>

            <TVFocusGuideView
                autoFocus
                destinations={[destinationItemRef.current]}
                importantForAccessibility={'no-hide-descendants'}
                style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, position: 'absolute', bottom: 50, width: '100%' }}
            >

                <FocusableBox
                    text='Rewind'
                    onPress={onRewind}
                />

                <FocusableBox
                    text={isPlaying ? 'Pause' : 'Play'}
                    ref={destinationItemRef}
                    onPress={onPlayPause}
                />
                <FocusableBox
                    text='Forward'
                    onPress={onForward}
                />

            </TVFocusGuideView>
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

