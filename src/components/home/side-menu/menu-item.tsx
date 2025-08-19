import * as React from 'react';
import { Pressable, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useScale } from '@/src/hooks/useScale';
import { useTheme } from '@/src/hooks/useTheme';



interface Props {
    text?: string;
    icon?: string;
    onPress?: () => void;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MenuItem = React.forwardRef(({ text, icon, onPress }: Props, forwardRef: any) => {
    const theme = useTheme();
    const scale = useScale();
    const styles = useStyles();

    const color = useSharedValue('#ffffff')

    const onFocus = () => {
        color.value = withTiming(theme.border, {
            duration: 300,
            easing: Easing.inOut(Easing.ease)
        });
    }

    const onBlur = () => {
        color.value = withTiming('#ffffff', {
            duration: 100,
            easing: Easing.inOut(Easing.ease)
        })
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            color: color.value,
        }
    }, [])

    return (
        <Pressable
            ref={forwardRef}
            onFocus={onFocus}
            onBlur={onBlur}
            onPress={onPress}
            style={state => [
                styles.item,
                (state.focused || state.hovered) && { borderColor: theme.border, borderWidth: 4 },
                state.pressed && { transform: [{ scale: 0.95 }] },
            ]}>
            <AnimatedIcon name={icon as "home"} size={24 * scale} style={animatedStyle} />
            {text !== undefined ? (
                <Animated.Text style={[styles.text, animatedStyle]}>{text}</Animated.Text>
            ) : null}
        </Pressable>
    );
});

export default React.memo(MenuItem);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        item: {
            height: 60 * scale,
            marginBottom: 6 * scale,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8 * scale,
            paddingHorizontal: 16 * scale,
        },
        text: {
            fontSize: 24 * scale,
            color: 'black',
            fontFamily: 'IBMPlexSansArabic-Regular',
        }
    });
}