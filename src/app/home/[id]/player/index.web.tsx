
import { StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { attachHls } from '@/src/lib/hls.web';


export default function Player() {
    // Replace with your video URL
    const video_url = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            attachHls(videoRef.current, video_url);
        }
    }, [video_url]);

    return (
        <div style={styles.container}>
            <video
                ref={videoRef}
                controls
                style={styles.video}
                playsInline
            />
        </div>
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
    }
});

