import * as React from "react";
import { ScrollView, Text, TVFocusGuideView, StyleSheet } from "react-native";
import { useScale } from "@/src/hooks/useScale";
import { generateData } from "@/src/lib/utils";
import Section from "./section";
import Categories from "./categories";
import ShowPreview from "../show-preview";
import FocusableBox from "../../focusable-box";

const ContentArea = React.forwardRef((_, forwardedRef: any) => {
    const styles = useStyles();
    return (
        <TVFocusGuideView ref={forwardedRef} autoFocus style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>
                أهلا علي
            </Text>
            <ShowPreview />
            <ScrollView>
                {/* <Categories title="Category Example 1" /> */}
                <Section />
                <Section />

                <TVFocusGuideView style={styles.cols}>
                    <Col title="Genres" />
                </TVFocusGuideView>

            </ScrollView>
        </TVFocusGuideView>
    );
});

const Col = ({ title }: { title: string }) => {
    const styles = useStyles();
    const data = React.useMemo(() => generateData(10), []);
    return (
        <TVFocusGuideView autoFocus style={styles.col}>
            <Text style={styles.colTitle}>{title}</Text>
            {data.map((item, index) => (
                <FocusableBox key={index.toString()} text={index.toString()} style={styles.colItem} />
            ))}
        </TVFocusGuideView>
    );
};

export default React.memo(ContentArea);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        pageTitle: {
            fontSize: 48 * scale, margin: 10 * scale,
            fontFamily: "IBMPlexSansArabic-Bold",
            color: '#fff'
        },
        focusToSideMenuBtn: {
            height: 100 * scale,
            marginHorizontal: 16 * scale,
        },
        col: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 8 * scale,
        },
        colTitle: {
            margin: 10 * scale,
            fontSize: 24 * scale,
            color: '#fff',
        },
        cols: {
            flexDirection: 'row',
            paddingHorizontal: 16 * scale,
        },
        colItem: {
            width: '100%',
            height: 100 * scale,
            marginBottom: 5 * scale,
        },
    })
}