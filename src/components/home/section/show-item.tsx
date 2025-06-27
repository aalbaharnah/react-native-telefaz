import { TouchableOpacity, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useScale } from "@/src/hooks/useScale";
import { Show } from "@/src/lib/data";
import { ThemedText } from "../../ThemedText";
import { useFocusedShowStore } from "@/src/zustand/focused-show.store";
import { useCallback } from "react";

interface Props {
    show: Show;
    index: number;
}

export default function ShowItem({ show, index }: Props) {
    const styles = useStyles();
    const setFocusedShow = useFocusedShowStore(s => s.setFocusedShow)

    const onFocus = useCallback(() => {
        // Handle show selection
        console.log(`Selected show: ${show.Title}`);
        setFocusedShow(show);
    }, [show])

    const hasTVPreferredFocus = index === 0; // autoFocus on the first item
    const soruce = { uri: show.Poster };

    return (
        <TouchableOpacity
            style={styles.show}
            hasTVPreferredFocus={hasTVPreferredFocus} // autoFocus on the first item
            onFocus={onFocus}
        >
            <Animated.Image source={soruce} style={styles.thumbnail} />
            <ThemedText numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{show.Title}</ThemedText>
        </TouchableOpacity>
    )
}




const useStyles = function () {
    const scale = useScale();
    return StyleSheet.create({
        show: {
            width: 200,
            borderRadius: 10,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4 * scale,
        },
        thumbnail: {
            width: '100%',
            height: 300,
            borderRadius: 10,
            objectFit: 'cover',
        },
        title: {
            fontSize: 12 * scale,
        }
    });
};