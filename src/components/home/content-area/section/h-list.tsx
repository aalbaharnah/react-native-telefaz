import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import FocusableBox from '@/src/components/focusable-box';
import { generateData, getItemText } from '@/src/lib/utils';


interface Props {
    itemCount?: number;
    itemWidth?: number;
    itemHeight?: number;
    onItemFocused?: (id?: number) => void;
    onItemPressed?: (id?: number) => void;
    prefix?: string;
    slow?: boolean;
    onPress?: any;
    data?: any;
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
    slow,
    ...props
}: Props,
    forwardedRef: any,
) => {
    const data = React.useMemo(() => generateData(itemCount), [itemCount]);
    const scale = useScale();
    const styles = useStyles();

    const renderItem: any = ({ item, index }: { item: number, index: number }) => {
        return (
            <FocusableBox
                id={item}
                width={itemWidth ?? 500 * scale}
                height={itemHeight ?? 120 * scale}
                style={styles.mr5}
                text={getItemText({ prefix, item })}
                onFocus={(e, id) => { onItemFocused?.(id) }}
                onPress={() => { onItemPressed?.(index) }}
                slow={slow}
            />
        );
    };

    return (
        <FlatList
            keyExtractor={item => getItemText({ prefix, item })}
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
        },
        mr5: {
            marginRight: 5 * scale,
        },
    });
}