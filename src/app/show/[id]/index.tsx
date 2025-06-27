import FocusableBox from "@/src/components/focusable-box";
import { useScale } from "@/src/hooks/useScale";
import { useTheme } from "@/src/hooks/useTheme";
import { useFocusedShowStore } from "@/src/zustand/focused-show.store";
import { use, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ImageBackground, TVFocusGuideView, Pressable } from "react-native";

export default function ShowScreen() {
    const ref = useRef<typeof TVFocusGuideView>(null);

    const [showFoucuse, setShowFocus] = useState(false);
    const theme = useTheme();
    const focusedShow = useFocusedShowStore(s => s.focusedShow);
    const styles = useStyles();

    useEffect(() => {
        setShowFocus(true);
        () => {
            setShowFocus(false);
        }
    }, [])

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
                {showFoucuse && (
                    <TVFocusGuideView hasTVPreferredFocus={showFoucuse} autoFocus style={styles.view}>
                        <FocusableBox style={styles.sideMenuItem} onFocus={() => { }} />
                        <FocusableBox style={styles.sideMenuItem} onFocus={() => { }} />
                    </TVFocusGuideView>
                )}
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