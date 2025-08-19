import { useScale } from "@/src/hooks/useScale";
import { useTheme } from "@/src/hooks/useTheme";
import { useFavoritesStore } from "@/src/zustand/favorites.store";
import { useFocusedShowStore } from "@/src/zustand/focused-show.store";
import { usePlaylistStore } from "@/src/zustand/playlist.store";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useRef } from "react";
import { View, StyleSheet, Text, ImageBackground, TVFocusGuideView, Pressable, Alert } from "react-native";

export default function ShowScreen() {
    const ref = useRef<typeof TVFocusGuideView>(null);

    const theme = useTheme();
    const focusedShow = useFocusedShowStore(s => s.focusedShow);
    const playlistItem = usePlaylistStore(s => s.playlist.find(item => item.show_id === focusedShow?.id));
    const { favorites, setFavorites } = useFavoritesStore()

    const scale = useScale();
    const styles = useStyles();

    const onPlayNowPress = () => {
        if (!focusedShow) {
            Alert.alert("Error", "No show is currently focused.", [
                {
                    text: "OK",
                    onPress: () => router.back(),
                },
            ]);
            return;
        };

        router.push(`/home/${focusedShow?.id}/player?t=${playlistItem?.current_time ?? 0}`);
    }

    const onFavoritePress = () => {
        if (!focusedShow) return;
        setFavorites(focusedShow)
    }

    const isFavorite = useMemo(() => {
        if (!focusedShow) return false;
        return favorites.some(fav => fav.id === focusedShow.id);
    }, [focusedShow, favorites]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ImageBackground
                style={styles.header}
                source={focusedShow?.backdrop_path ? { uri: `https://image.tmdb.org/t/p/w1280${focusedShow?.backdrop_path}` } : require('@/assets/images/partial-react-logo.png')}
                resizeMode='cover'
                imageStyle={styles.background_image}
            >
                <View style={{ flex: 2 }}>

                </View>

                <LinearGradient
                    style={styles.overlay}
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 1)',]}
                >
                    <Pressable
                        onPress={onPlayNowPress}
                        style={state => [
                            styles.play,
                            state.focused && { borderColor: theme.text, borderWidth: 4 * scale },
                            state.pressed && { transform: [{ scale: 0.95 }] },
                        ]}>

                        <Text style={{ fontSize: 24 * scale, color: theme.text }}>{"Play Now"}</Text>
                    </Pressable>
                    <Pressable
                        onPress={onFavoritePress}
                        style={state => [
                            styles.favorite,
                            state.focused && { borderColor: theme.tint, borderWidth: 4 * scale },
                            state.pressed && { transform: [{ scale: 0.95 }] },
                        ]}>

                        <Text style={{ fontSize: 24 * scale, color: theme.text }}>{!isFavorite ? "Add to Favorite" : "Remove from Favorite"}</Text>
                    </Pressable>
                </LinearGradient>
            </ImageBackground>
        </View >
    );
};

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
        },
        header: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            flexDirection: 'column',
            objectFit: 'cover',
            resizeMode: 'cover',
        },
        background_image: {
            resizeMode: 'cover',
            alignSelf: 'flex-start',
            width: '100%',
            height: '100%',
        },
        overlay: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 24 * scale,
            paddingHorizontal: 72 * scale,
        },
        sideMenuItem: {
            width: 80 * scale,
            height: 80 * scale,
            marginBottom: 6 * scale,
        },
        play: {
            width: 250 * scale,
            height: 80 * scale,
            backgroundColor: 'rgba(237, 69, 50, 1)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
        },
        favorite: {
            width: 250 * scale,
            height: 80 * scale,
            backgroundColor: '#333',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
        }
    })
}