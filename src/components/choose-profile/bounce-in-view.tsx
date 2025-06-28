import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { useScale } from "../../hooks/useScale";


interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
    duration?: number;
    delay?: number;
}

export default function BounceInView({ children, style, duration = 300, delay = 0 }: Props) {
    const scale = useScale();
    const state = useSharedValue(scale * 24);
    const opacity = useSharedValue(0);


    opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.inOut(Easing.ease)
    });

    state.value = withDelay(
        delay,
        withSpring(0, {
            damping: 50,
            stiffness: 500,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
        }),
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: state.value }],
            opacity: opacity.value
        };
    });

    return (
        <Animated.View style={[animatedStyle, style]}>
            {children}
        </Animated.View>
    );
}