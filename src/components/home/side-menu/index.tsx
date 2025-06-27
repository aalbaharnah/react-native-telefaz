import * as React from 'react';
import { StyleSheet, Text, TVFocusGuideView, View } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import MenuItem from './menu-item';


const SideMenu = React.forwardRef((_, forwardedRef: any) => {
    const styles = useStyles();

    return (
        <TVFocusGuideView autoFocus style={styles.sideMenuContainer} ref={forwardedRef}>
            <View style={{ flex: 1 }}>
                <MenuItem text='Home' icon="home-outline" />
                <MenuItem text='Search' icon="search-outline" />
                <MenuItem text='Favories' icon="bookmark-outline" />
                <MenuItem text='Library' icon='library-outline' />
            </View>
            <View>
                <MenuItem text='Settings' icon="settings-outline" />
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