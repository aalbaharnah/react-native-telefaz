import * as React from 'react';
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { useScale } from '../hooks/useScale';

interface Props {
    id?: number;
    width?: number;
    height?: number;
    text?: string;
    onFocus?: (e: FocusEvent, id?: number) => void;
    onPress?: any;
    style?: any;
    hasTVPreferredFocus?: boolean;
    testID?: string;
}

const FocusableBox = React.forwardRef((props: Props, forwardRef: any) => {
    const theme = useTheme();
    const styles = useStyles();
    const { id, width, height, text, style, testID } = props;

    const onFocus = (e: any) => props?.onFocus?.(e, id);
    const onPress = (e: any) => props?.onPress?.(e, id);


    return (
        <Pressable
            ref={forwardRef}
            testID={testID}
            onFocus={onFocus}
            onPress={onPress}
            style={state => [
                styles.focusableBox,
                {
                    width,
                    height,
                    backgroundColor: theme.card,
                },
                state.focused && { borderColor: theme.tint },
                state.pressed && { transform: [{ scale: 0.95 }] },
                style,
            ]}>
            {text !== undefined ? (
                <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
            ) : null}
        </Pressable>
    );
});

export default React.memo(FocusableBox);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        focusableBox: {
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 4 * scale,
        },
        focused: {
            borderColor: '#007AFF',
            borderWidth: 2 * scale,
        },
        text: {
            fontSize: 24 * scale,
            color: '#000000',
        },
    });
}