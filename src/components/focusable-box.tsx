import * as React from 'react';
import { Pressable, Text } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { useScale } from '../hooks/useScale';



interface Props {
    id?: number;
    width?: number;
    height?: number;
    text?: string;
    slow?: boolean;
    onFocus?: (e: FocusEvent, id?: number) => void;
    onPress?: any;
    style?: any;
    hasTVPreferredFocus?: boolean;
}

const FocusableBox = React.forwardRef((props: Props, forwardRef: any) => {
    const theme = useTheme();
    const scale = useScale();
    const { id, width, height, text, slow, style } = props;

    if (slow) {
        const now = performance.now();
        while (performance.now() - now < 200) { }
    }

    const onFocus = (e: any) => props?.onFocus?.(e, id);
    const onPress = (e: any) => props?.onPress?.(e, id);

    return (
        <Pressable
            ref={forwardRef}
            onFocus={onFocus}
            onPress={onPress}
            style={state => [
                {
                    width,
                    height,
                    backgroundColor: theme.card,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                },
                state.focused && { borderColor: theme.tint, borderWidth: 4 },
                style,
            ]}>
            {text !== undefined ? (
                <Text style={{ fontSize: 24 * scale, color: theme.text }}>{text}</Text>
            ) : null}
        </Pressable>
    );
});

export default React.memo(FocusableBox);
