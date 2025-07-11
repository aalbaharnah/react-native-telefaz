import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import { Show } from '@/src/lib/types';

function SkeletonHList() {
    const styles = useStyles();
    const data = Array.from({ length: 21 }, (_, i) => ({ id: i }));
    const renderItem = () => {
        return (
            <View style={styles.item}>
                <View style={styles.thumbnail} />
                <Text style={styles.title}></Text>
            </View>
        )
    };

    return (
        <FlatList
            keyExtractor={item => item.id.toString()}
            data={data}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.hListContainer}
        />

    );
}

export default React.memo(SkeletonHList);


const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        hListContainer: {
            paddingHorizontal: 16 * scale,
            gap: 16 * scale,
        },
        item: {
            width: 200 * scale,
            borderRadius: scale * 10,
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        title: {
            height: 18 * scale,
            width: '80%',
            fontFamily: 'IBMPlexSansArabic-Regular',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: scale * 10,
        }
    });
}