
import { View, StyleSheet, ActivityIndicator, TVFocusGuideView, Platform } from 'react-native';
import { useVideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useRef, useState } from 'react';
import { useEventListener } from 'expo';
import ControllerContainer from '@/src/components/player/controller-container';

export default function Player() {

    const [loading, setLoading] = useState(true);

    const destinationItemRef = useRef<any>(null);
    const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus>('idle');


    // Replace with your video URL
    const video_url = Platform.isTVOS ? 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8' : 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'
    // const video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'; 
    const player = useVideoPlayer(video_url, (p) => {
        p.timeUpdateEventInterval = 0.50; // Update every second
        p.play();
    });



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
                setLoading(true);
                break;
            case "idle":
                // Handle idle state
                break;
            default:
                break;
        }

        console.log('Player status changed: ', status);
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

