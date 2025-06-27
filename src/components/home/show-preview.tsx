import { ImageBackground, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useScale } from '@/src/hooks/useScale';
import { useFocusedShowStore } from '@/src/zustand/focused-show.store';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

export default function ShowPreview() {
    const focusedShow = useFocusedShowStore(s => s.focusedShow);
    const styles = useStyles();

    const source = { uri: focusedShow?.Poster ?? "" };
    return (
        <ImageBackground
            style={styles.header}
            source={source}
            blurRadius={18}
        >
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                }}
            >
                <Animated.Image
                    source={source}
                    style={styles.poster}
                />
                <View
                    focusable={false}
                    style={styles.details}
                >
                    <ThemedText style={styles.title}>{focusedShow?.Title}</ThemedText>
                    <ThemedText style={styles.plot}>{focusedShow?.Plot}</ThemedText>
                </View>
            </View>
        </ImageBackground>
    );
}

const useStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        header: {
            height: 175 * scale,
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            flexDirection: 'row',
        },
        poster: {
            width: 100 * scale,
            height: 150 * scale,
            borderRadius: 10 * scale,
            margin: 8 * scale,
        },
        details: {
            flexDirection: 'column',
            padding: 4 * scale,
            width: '40%'
        },
        title: {
            fontSize: 16 * scale,
            color: '#fff',
            fontFamily: 'IBMPlexSansArabic-Bold'
        },
        plot: {
            fontSize: 14 * scale,
            color: '#ccc',
            marginTop: 4 * scale,
        }
    });
};
