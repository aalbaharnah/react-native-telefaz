import { useScale } from "@/src/hooks/useScale";
import * as React from "react";
import { ScrollView, Text, TVFocusGuideView, StyleSheet } from "react-native";
import Section from "./section";
import FocusableBox from "../../focusable-box";
import Categories from "./categories";

interface ContentAreaProps {
    sideMenuRef: {
        current: any
    }
};

const ContentArea = React.forwardRef(({ sideMenuRef }: ContentAreaProps, forwardedRef: any) => {
    const styles = useStyles();
    return (
        <TVFocusGuideView ref={forwardedRef} autoFocus style={{ flex: 1 }}>

            <ScrollView>
                <Text style={styles.pageTitle}>
                    أهلا علي
                </Text>
                <Categories title="Category Example 1" />
                <Section />
                <Section />

                <TVFocusGuideView autoFocus style={styles.cols}>
                    <Col title="Genres" />
                    <Col title="Genres" />
                    <Col title="Genres" />
                </TVFocusGuideView>

            </ScrollView>
        </TVFocusGuideView>
    );
});

const Col = ({ title }: { title: string }) => {
    const styles = useStyles();
    return (
        <TVFocusGuideView autoFocus style={styles.col}>
            <Text style={styles.colTitle}>{title}</Text>
            <FocusableBox text="0" style={styles.colItem} />
            <FocusableBox text="1" style={styles.colItem} />
            <FocusableBox text="2" style={styles.colItem} />
            <FocusableBox text="3" style={styles.colItem} />
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
            fontSize: 24 * scale
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