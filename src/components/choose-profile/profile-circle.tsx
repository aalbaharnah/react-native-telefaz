
import { PropsWithChildren } from "react";
import BounceInView from "./bounce-in-view";
import { Pressable, Text, StyleSheet } from "react-native";
import { useScale } from "@/src/hooks/useScale";
import { useTheme } from "@/src/hooks/useTheme";

interface ProfileProps extends PropsWithChildren {
    name: string;
    delay: number;
    onPress?: () => void;
}

export default function ProfileCircle({ name, delay = 0, onPress, children }: ProfileProps) {
    const scale = useScale();
    const theme = useTheme();
    const styles = useStyles();

    return (
        <BounceInView style={styles.container} delay={delay}>
            <Pressable
                onPress={onPress}

                style={state => [
                    styles.profile,
                    (state.focused || state.hovered) && { borderColor: theme.tint, },
                    state.pressed && { transform: [{ scale: 0.95 }] },
                ]}>
                {children}
            </Pressable>
            <Text style={{ color: theme.text, fontSize: scale * 24 }}>{name}</Text>
        </BounceInView>
    )
}

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10 * scale
        },
        profile: {
            width: 200 * scale,
            height: 200 * scale,
            backgroundColor: '#333333',
            borderRadius: 100 * scale,
            borderWidth: 4,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
        },
        name: {
            fontSize: scale * 24,
            fontFamily: "IBMPlexSansArabic-Bold",
            color: '#fff',
        },
    });
}