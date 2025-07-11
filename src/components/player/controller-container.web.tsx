import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoPlayer } from 'expo-video';
import { useEvent } from 'expo';
import ControlButton from '@/src/components/player/control-button';
import { useScale } from '@/src/hooks/useScale';
import ProgressBar from './progress-bar';

interface Props {
    player: VideoPlayer;
}

const ControllerContainer = React.forwardRef(({ player }: Props, forwardRef: any) => {
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const styles = useStyles()

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
        <LinearGradient style={styles.container} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}>
            <ProgressBar player={player} />
            <View importantForAccessibility={'no-hide-descendants'} style={styles.buttons}>
                <ControlButton
                    icon='play-back'
                    onPress={onRewind}
                />

                <ControlButton
                    icon={isPlaying ? 'pause' : 'play'}
                    ref={forwardRef}
                    onPress={onPlayPause}
                />
                <ControlButton
                    icon="play-forward"
                    onPress={onForward}
                />

            </View>
        </LinearGradient>
    );
});


export default React.memo(ControllerContainer);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            width: '100%',
            position: 'absolute',
            flexDirection: 'column',
            padding: scale * 24,
            bottom: 0,
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: scale * 24,
            width: '100%',
        }
    })
}

