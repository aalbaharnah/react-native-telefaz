import * as React from 'react';
import { StyleSheet, TVFocusGuideView } from 'react-native';
import { ThemedText } from '../ThemedText';
import FocusableBox from '../focusable-box';
import { useScale } from '@/src/hooks/useScale';
import { useTheme } from '@/src/hooks/useTheme';


const SideMenu = React.forwardRef((_, forwardedRef: any) => {
    const theme = useTheme();
    const scale = useScale();
    const styles = useStyles();

    const sideMenuItemStyle = [
        styles.sideMenuItem,
        { backgroundColor: theme.TertiarySystemFillColor },
    ];
    return (
        <TVFocusGuideView autoFocus style={styles.sideMenuContainer} ref={forwardedRef}>
            <ThemedText style={{ fontSize: 18 * scale, marginBottom: 10 * scale }}>
                Side Menu
            </ThemedText>

            <FocusableBox style={sideMenuItemStyle} />
            <FocusableBox style={sideMenuItemStyle} />
            <FocusableBox style={sideMenuItemStyle} />
            <FocusableBox style={sideMenuItemStyle} />
            <FocusableBox style={sideMenuItemStyle} />
        </TVFocusGuideView>
    );
});

export default React.memo(SideMenu);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        sideMenuContainer: {
            width: 100 * scale,
            alignItems: 'center',
        },
        sideMenuItem: {
            width: 80 * scale,
            height: 80 * scale,
            marginBottom: 6 * scale,
        },
    });
}