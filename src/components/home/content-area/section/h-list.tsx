import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import { Show } from '@/src/lib/types';
import ShowItem from './show-item';

interface Props {
    data?: Show[] | any[];
    initialNumToRender?: number;
    maxToRenderPerBatch?: number;
    windowSize?: number;
}

const HList = React.forwardRef(({ data, ...props }: Props, forwardedRef: any) => {
    const styles = useStyles();

    const renderItem = ({ item }: { item: Show }) => {
        return <ShowItem item={item} />
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
        }
    });
}