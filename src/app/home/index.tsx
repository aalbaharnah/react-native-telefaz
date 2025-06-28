import * as React from 'react';
import { View, StyleSheet } from "react-native";
import { useTheme } from '@/src/hooks/useTheme';
import SideMenu from '@/src/components/home/side-menu';
import ContentArea from '@/src/components/home/content-area';

export default function HomeScreen() {
    const sideMenuRef = React.useRef<any>(null);
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SideMenu ref={sideMenuRef} />
            <ContentArea />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
});