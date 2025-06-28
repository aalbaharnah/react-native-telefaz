import * as React from 'react';
import { FlatList, StyleSheet, Text, TVFocusGuideView, View } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import FocusableBox from '@/src/components/focusable-box';
import { Show } from '@/src/lib/types';

interface Props {
    title: string;
    focusable?: boolean;
}

export default function Categories({ title, focusable }: Props) {
    const scale = useScale();
    const styles = useStyles();
    const categoryData = ['movies', 'TV shows', 'documentaries'];

    const renderItem: any = ({ item, index }: { item: string, index: number }) => {
        return (
            <FocusableBox
                onPress={() => { }}
                onFocus={() => { }}
                width={200 * scale}
                height={50 * scale}
                text={item}
            />
        );
    };

    return (
        <View style={styles.mv}>
            <TVFocusGuideView
                autoFocus
                style={styles.rowTop}
                focusable={focusable}
                importantForAccessibility={focusable === false ? 'no-hide-descendants' : 'auto'}
            >
                <Text style={styles.rowTitle}>{title}</Text>
                <FlatList
                    keyExtractor={item => item}
                    data={categoryData}
                    renderItem={renderItem}
                    horizontal
                    contentContainerStyle={{ gap: 8 * scale, paddingHorizontal: 8 * scale }}
                />
            </TVFocusGuideView>

        </View>
    );
};

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        mv: {
            marginVertical: 16 * scale
        },
        rowTitle: {
            fontSize: 24 * scale,
            fontFamily: 'IBMPlexSansArabic-Bold',
            color: '#fff'
        },
        rowTop: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8 * scale,
        },
    });
}