import * as React from 'react';
import { Pressable, Text, StyleSheet } from "react-native";
import { useScale } from '@/src/hooks/useScale';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSharedValue } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';

interface Props {
    icon: 'play' | 'pause' | 'play-forward' | 'play-back';
    onFocus?: () => void;
    onPress?: () => void;
    hasTVPreferredFocus?: boolean;
}

const ControlButton = React.forwardRef(({ icon, onFocus, onPress }: Props, forwardRef: any) => {
    const scale = useScale();
    const theme = useTheme();
    const styles = useStyles();

    const state = useSharedValue(0)


    const onButtonFocus = () => {
        onFocus?.();
    };

    return (
        <Pressable
            ref={forwardRef}
            onFocus={onFocus}
            onPress={onPress}
            style={state => [
                styles.button,
                state.focused && { borderColor: theme.tint },
                state.pressed && { transform: [{ scale: 0.95 }] },
            ]}>
            <Ionicons name={icon} color="#fff" size={24 * scale} />
        </Pressable>
    );
});

export default React.memo(ControlButton);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        button: {
            width: 60 * scale,
            height: 60 * scale,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30 * scale,
            borderWidth: 4 * scale,
            borderColor: '#fff',
        },
    });
}