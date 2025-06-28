import * as React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import { useTheme } from '@/src/hooks/useTheme';
import { Show } from '@/src/lib/types';
import Animated from 'react-native-reanimated';
import { useFocusedShowStore } from '@/src/zustand/focused-show.store';
import { router, useLocalSearchParams } from 'expo-router';


interface Props {
    itemCount?: number;
    itemWidth?: number;
    itemHeight?: number;
    onItemFocused?: (id?: number) => void;
    onItemPressed?: (id?: number) => void;
    prefix?: string;
    slow?: boolean;
    onPress?: any;
    data?: Show[];
    initialNumToRender?: number;
    maxToRenderPerBatch?: number;
    windowSize?: number;
}


const HList = React.forwardRef(({
    itemCount,
    itemWidth,
    itemHeight,
    onItemFocused,
    onItemPressed,
    prefix = '',
    data,
    ...props
}: Props,
    forwardedRef: any,
) => {

    const scale = useScale();
    const styles = useStyles();
    const theme = useTheme();

    const setFocusedShow = useFocusedShowStore(s => s.setFocusedShow)

    const renderItem: any = ({ item, index }: { item: Show, index: number }) => {
        const onFocus = (e: any) => {
            setFocusedShow(item);
        }

        const onPress = (e: any) => {
            setFocusedShow(item);
            router.push(`/home/${item.id}`);
        };

        return (
            <Pressable
                onFocus={onFocus}
                onPress={onPress}
                // tvParallaxProperties={{
                //     enabled: true,
                //     magnification: 1.1,
                //     tiltAngle: 0
                // }}
                style={state => [
                    styles.show,
                    { borderColor: state.focused ? theme.tint : "trasparent", borderWidth: 4 },
                    state.pressed && { transform: [{ scale: 0.95 }] },
                ]}>

                <Animated.Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.thumbnail} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.original_title}</Text>
            </Pressable>
        );
    };

    return (
        <FlatList
            keyExtractor={item => item.id.toString()}
            ref={forwardedRef}
            data={data}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.hListContainer}
            {...props}
        />
    );
},
);

export default React.memo(HList);


const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        hListContainer: {
            paddingHorizontal: 16 * scale,
            gap: 16 * scale,
        },
        mr5: {
            marginRight: 5 * scale,
        },
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
            fontSize: 18 * scale,
            fontFamily: 'IBMPlexSansArabic-Regular',
            color: '#fff',
        }
    });
}