
import * as React from 'react';
import { View, StyleSheet } from "react-native";
import { useTheme } from '../hooks/useTheme';
import SideMenu from '../components/home/side-menu';
import ContentArea from '../components/home/content-area';

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