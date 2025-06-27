import * as React from 'react';
import { StyleSheet, Text, TVFocusGuideView, View } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import HList from './section/h-list';

interface Props {
    title: string;
    focusable?: boolean;
}

export default function Categories({ title, focusable }: Props) {
    const scale = useScale();
    const styles = useStyles();

    const [selectedCategory, setSelectedCategory] = React.useState('1');

    const onCategoryFocused = (id: number) => {
        setSelectedCategory(id.toString());
    };

    const categoryData = [1, 2, 3, 4, 5];
    const getSelectedItemPrefix = (selectedCategory: string) => {
        if (selectedCategory === null) {
            return 'Item';
        }

        return `Category ${selectedCategory} - Item`;
    };

    return (
        <View style={styles.mb5}>
            <TVFocusGuideView
                autoFocus
                style={styles.rowTop}
                focusable={focusable}
                importantForAccessibility={focusable === false ? 'no-hide-descendants' : 'auto'}>
                <Text style={styles.rowTitle}>{title}</Text>
                <HList
                    prefix="Category"
                    itemCount={5}
                    data={categoryData}
                    itemHeight={50 * scale}
                    itemWidth={200 * scale}
                    onItemFocused={() => { }}
                />
            </TVFocusGuideView>

        </View>
    );
};

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        mb5: {
            marginBottom: 5 * scale
        },
        rowTitle: {
            fontSize: 24 * scale,
            fontFamily: 'IBMPlexSansArabic-Bold',
        },
        rowTop: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8 * scale,
        },
    });
}