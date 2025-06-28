import FocusableBox from "@/src/components/focusable-box";
import { useScale } from "@/src/hooks/useScale";
import { useTheme } from "@/src/hooks/useTheme";
import { useFocusedShowStore } from "@/src/zustand/focused-show.store";
import { router } from "expo-router";
import { use, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ImageBackground, TVFocusGuideView, Pressable } from "react-native";

export default function ShowScreen() {
    const ref = useRef<typeof TVFocusGuideView>(null);

    const theme = useTheme();
    const focusedShow = useFocusedShowStore(s => s.focusedShow);
    const styles = useStyles();

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

                <View style={styles.view}>
                    <FocusableBox style={styles.sideMenuItem} onFocus={() => { }}
                        text="Play"
                        onPress={() => router.push(`/home/${focusedShow?.id}/player`)}
                    />
                    <FocusableBox style={styles.sideMenuItem} onFocus={() => { }} />
                </View>
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
        view: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flexDirection: 'row',
            alignItems: 'center',
        },
        sideMenuItem: {
            width: 80 * scale,
            height: 80 * scale,
            marginBottom: 6 * scale,
        },
    })
}