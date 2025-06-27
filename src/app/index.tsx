
import * as React from 'react';
import { View, StyleSheet } from "react-native";
import { useTheme } from '../hooks/useTheme';
import SideMenu from '../components/home/side-menu';
import ContentArea from '../components/home/content-area';

export default function HomeScreen() {
    const sideMenuRef = React.useRef<any>(null);
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.BackgroundColor }]}>
            <SideMenu ref={sideMenuRef} />
            <ContentArea sideMenuRef={sideMenuRef} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
});