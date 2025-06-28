import * as React from 'react';
import { StyleSheet, Text, TVFocusGuideView, View } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { useScale } from '@/src/hooks/useScale';
import MenuItem from './menu-item';

const SideMenu = React.forwardRef((_, forwardedRef: any) => {
    const styles = useStyles();

    const onNavigate = (route: string) => {
        router.push(`/${route}` as RelativePathString);
    }

    return (
        <TVFocusGuideView autoFocus style={styles.sideMenuContainer} ref={forwardedRef}>
            <View style={{ flex: 1 }}>
                <MenuItem text='Home' icon="home-outline" onPress={() => onNavigate("home")} />
                <MenuItem text='Favories' icon="bookmark-outline" onPress={() => onNavigate('favorites')} />
                <MenuItem text='Search' icon="search-outline" onPress={() => onNavigate("search")} />
                <MenuItem text='Library' icon='library-outline' onPress={() => onNavigate("library")} />
            </View>
            <View>
                <MenuItem text='Settings' icon="settings-outline" onPress={() => onNavigate("settings")} />
            </View>
        </TVFocusGuideView>
    );
});

export default React.memo(SideMenu);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        sideMenuContainer: {
            paddingTop: 175 * scale,
            paddingBottom: 16 * scale,
            width: 220 * scale,
            height: '100%',
        },
    });
}