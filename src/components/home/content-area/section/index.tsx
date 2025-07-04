import { useScale } from "@/src/hooks/useScale";
import * as React from "react";
import { FlatList, Text, TVFocusGuideView, StyleSheet } from "react-native";
import HList from "./h-list";
import { Show } from "@/src/lib/types";

interface Props {
    data?: Show[] | any[];
    loading?: boolean;
    title: string;
    autoFocus?: boolean;
}

function Section({ data, title, loading, autoFocus }: Props) {
    const scale = useScale();
    const styles = useStyles();
    const listRef = React.useRef<React.ElementRef<typeof FlatList> | null>(null);

    const onItemPressed = () => {
        listRef.current?.scrollToIndex({ index: 0, animated: false });
    };

    return (
        <TVFocusGuideView autoFocus={autoFocus} style={styles.mb5}>
            <Text style={styles.rowTitle}>
                Top {data?.length || 0} {title}
            </Text>
            <HList
                ref={listRef}
                data={data}
                itemCount={10}
                onItemPressed={onItemPressed}
            />
        </TVFocusGuideView>
    );
};


export default React.memo(Section);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        mb5: {
            marginBottom: 5 * scale
        },
        rowTitle: {
            fontSize: 24 * scale,
            marginLeft: 16 * scale,
            marginVertical: 16 * scale,
            fontFamily: "IBMPlexSansArabic-Bold",
            color: '#fff'
        },
    })
};