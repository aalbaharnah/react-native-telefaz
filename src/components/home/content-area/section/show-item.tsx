import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import { useTheme } from '@/src/hooks/useTheme';
import { Show } from '@/src/lib/types';
import Animated from 'react-native-reanimated';
import { useFocusedShowStore } from '@/src/zustand/focused-show.store';
import { router } from 'expo-router';

interface Props {
    item: Show;
}

function ShowItem({ item }: Props) {

    const scale = useScale();
    const styles = useStyles();
    const theme = useTheme();

    const setFocusedShow = useFocusedShowStore(s => s.setFocusedShow)

    const onFocus = () => {
        setFocusedShow(item);
    }

    const onPress = () => {
        setFocusedShow(item);
        router.push(`/home/${item.id}`);
    };

    return (
        <Pressable
            onFocus={onFocus}
            onPress={onPress}
            style={state => [
                styles.show,
                { borderColor: state.focused ? theme.tint : "#000000", borderWidth: 4 * scale },
                state.pressed && { transform: [{ scale: 0.95 }] },
            ]}>

            <Animated.Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.thumbnail} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.original_title ?? item.original_name ?? ""}</Text>
        </Pressable>
    );
}

export default React.memo(ShowItem);


const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        show: {
            width: 200 * scale,
            borderRadius: 10,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4 * scale,
        },
        thumbnail: {
            width: '100%',
            height: 300 * scale,
            borderRadius: 10,
            objectFit: 'cover',
        },
        title: {
            fontSize: 18 * scale,
            fontFamily: 'IBMPlexSansArabic-Regular',
            color: '#fff',
        }
    });
}