import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { LinearTransition, FadingTransition, FadeOut, FadeIn, FadeInRight, FadeOutLeft, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';
import { useFocusedShowStore } from '@/src/zustand/focused-show.store';

const ReImageBackground = Animated.createAnimatedComponent(ImageBackground);

export default function ShowPreview() {
    const focusedShow = useFocusedShowStore(s => s.focusedShow);
    const styles = useStyles();
    const theme = useTheme();

    const source = focusedShow?.backdrop_path ?
        { uri: `https://image.tmdb.org/t/p/w1280${focusedShow?.backdrop_path}` }
        : require('@/assets/images/partial-react-logo.png');

    return (
        <ReImageBackground
            style={styles.header}
            source={source}
            resizeMode='cover'
            imageStyle={styles.background_image}
        >
            <LinearGradient
                style={styles.overlay}
                colors={theme.previewColors as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Animated.View focusable={false} style={styles.details}>
                    <Animated.Text entering={FadeInDown} key={focusedShow?.id + "title"} style={styles.title}>{focusedShow?.original_title ?? focusedShow?.original_name ?? ""}</Animated.Text>
                    <Animated.Text entering={FadeIn} exiting={FadeOut} key={focusedShow?.id + "date"} style={styles.date}>{focusedShow?.release_date ?? focusedShow?.first_air_date}</Animated.Text>
                    <Animated.Text entering={FadeIn} exiting={FadeOut} key={focusedShow?.id + "overview"} style={styles.plot} numberOfLines={6}>{focusedShow?.overview}</Animated.Text>
                </Animated.View>
            </LinearGradient>
        </ReImageBackground>
    );
}

const useStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        header: {
            height: 500 * scale,
            width: '100%',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            flexDirection: 'row',

            borderRadius: 10 * scale,
            marginHorizontal: 10 * scale,
            marginTop: 10 * scale,
        },
        background_image: {
            resizeMode: 'cover',
            alignSelf: 'flex-start',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            flexGrow: 1,
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
            paddingHorizontal: 24 * scale,
            paddingVertical: 12 * scale,
            width: '100%'
        },
        title: {
            fontSize: 64 * scale,
            color: '#fff',
            fontFamily: 'IBMPlexSansArabic-Bold',
            bottom: 4 * scale,
        },
        date: {
            fontSize: 24 * scale,
            color: '#ccc',
            marginBottom: 8 * scale,
        },
        plot: {
            fontSize: 24 * scale,
            color: '#ccc',
            marginTop: 4 * scale,
            width: '40%'
        }
    });
};
