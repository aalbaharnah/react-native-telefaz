
import { View, StyleSheet, ActivityIndicator, TVFocusGuideView, Platform, Alert } from 'react-native';
import { useVideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useRef, useState } from 'react';
import { useEventListener } from 'expo';
import ControllerContainer from '@/src/components/player/controller-container';
import { router, useLocalSearchParams } from 'expo-router';
import useAppState from '@/src/hooks/useAppState';
import useBackHandler from '@/src/hooks/useBackHandler';
import { usePlaylistStore } from '@/src/zustand/playlist.store';
import useNavigationBeforeRemove from '@/src/hooks/useNavigationBeforeRemove';


export default function Player() {
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const destinationItemRef = useRef<any>(null);
    const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus>('idle');
    const updatePlaylistItemProgress = usePlaylistStore(s => s.updatePlaylistItemProgress);

    // Replace with your video URL
    const video_url = Platform.isTVOS ? 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' : 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'
    // const video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'; 


    const player = useVideoPlayer(video_url, (p) => {
        const previousTime = params.t ? parseFloat(params.t as string) : 0;
        p.currentTime = previousTime; // Set the initial time if provided
        p.timeUpdateEventInterval = 0.50; // Update every second
        p.play();
    });


    const captureProgress = () => {
        if (!player) return;

        const show_id = params.id ? parseInt(params.id as string) : 0;
        const profile_id = 1; // Assuming a default profile_id, you might want to
        const progress = player?.currentTime || 0;
        updatePlaylistItemProgress(show_id, profile_id, progress);
    }

    useAppState(captureProgress)
    useBackHandler(captureProgress)
    useNavigationBeforeRemove(captureProgress)

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
                Alert.alert(
                    "Error",
                    `An error occurred: ${error?.message || 'Unknown error'}`,
                    [{ text: "OK", onPress: () => router.back() }]
                );
                break;
            case "idle":
                // Handle idle state
                break;
            default:
                break;
        }
    });

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

            <ControllerContainer
                ref={destinationItemRef}
                player={player}
            />

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
    }
});

