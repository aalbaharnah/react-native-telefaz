import { createContext, use } from 'react';
import { Appearance, ColorValue } from 'react-native';

export type RNTesterTheme = {
    LabelColor: ColorValue,
    SecondaryLabelColor: ColorValue,
    TertiaryLabelColor: ColorValue,
    QuaternaryLabelColor: ColorValue,

    PlaceholderTextColor: ColorValue,

    SystemBackgroundColor: ColorValue,
    SecondarySystemBackgroundColor: ColorValue,
    TertiarySystemBackgroundColor: ColorValue,

    GroupedBackgroundColor: ColorValue,
    SecondaryGroupedBackgroundColor: ColorValue,
    TertiaryGroupedBackgroundColor: ColorValue,

    SystemFillColor: ColorValue,
    SecondarySystemFillColor: ColorValue,
    TertiarySystemFillColor: ColorValue,
    QuaternarySystemFillColor: ColorValue,

    SeparatorColor: ColorValue,
    OpaqueSeparatorColor: ColorValue,
    LinkColor: ColorValue,
    SystemRedColor: ColorValue,
    SystemGreenColor: ColorValue,
    ToolbarColor: ColorValue,
    BackgroundColor: ColorValue,
    BorderColor: ColorValue,

    NavBarLabelActiveColor: ColorValue,
    NavBarLabelInactiveColor: ColorValue,
    NavBarComponentsActiveIcon: any,
    NavBarComponentsInactiveIcon: any,
    NavBarAPIsActiveIcon: any,
    NavBarAPIsInactiveIcon: any,
    NavBarPlaygroundActiveIcon: any,
    NavBarPlaygroundInactiveIcon: any,

};

const tintColorLight = 'rgb(237, 69, 50)';
const tintColorDark = 'rgb(237, 69, 50)';

export const themes = {
    light: {
        text: '#ffffff',
        background: '#000',
        tint: tintColorLight,
        card: '#333333',
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        link: '#0a7ea4',
        border: tintColorLight
    },
    dark: {
        text: '#ffffff',
        background: '#000',
        tint: tintColorLight,
        card: '#333333',
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        link: '#0a7ea4',
        border: tintColorLight
    },
};



export const RNTesterThemeContext = createContext(
    Appearance.getColorScheme() === 'dark' ? themes.dark : themes.light,
);

export function useTheme() {
    return use(RNTesterThemeContext);
}
