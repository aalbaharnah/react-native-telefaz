import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useScale } from '@/src/hooks/useScale';
import { useFocusedShowStore } from '@/src/zustand/focused-show.store';
import { LinearGradient } from 'expo-linear-gradient';



export default function ShowPreview() {
    const focusedShow = useFocusedShowStore(s => s.focusedShow);
    const styles = useStyles();

    const source = focusedShow?.backdrop_path ? { uri: `https://image.tmdb.org/t/p/w1280${focusedShow?.backdrop_path}` } : require('@/assets/images/partial-react-logo.png');

    return (
        <ImageBackground
            style={styles.header}
            source={source}
            resizeMode='cover'
            imageStyle={styles.background_image}
        >
            <LinearGradient
                style={styles.overlay}
                colors={['rgba(237, 69, 50, 1)', 'rgba(237, 69, 50, 1)', 'rgba(237, 69, 50, 1)', 'rgba(237, 69, 50, 0.5)', 'rgba(237, 69, 50, 0)', 'rgba(237, 69, 50, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >

                <View
                    focusable={false}
                    style={styles.details}
                >
                    <Text style={styles.title}>{focusedShow?.original_title}</Text>
                    <Text style={styles.plot}>{focusedShow?.release_date}</Text>
                </View>
            </LinearGradient>
        </ImageBackground>
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
            padding: 10 * scale,
            width: '100%'
        },
        title: {
            fontSize: 64 * scale,
            color: '#fff',
            fontFamily: 'IBMPlexSansArabic-Bold',
            bottom: 4 * scale,
        },
        plot: {
            fontSize: 14 * scale,
            color: '#ccc',
            marginTop: 4 * scale,
        }
    });
};
