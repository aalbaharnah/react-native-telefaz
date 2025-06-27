import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { useTextStyles } from '@/src/hooks/useTextStyles';
import { useTheme } from '../hooks/useTheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { text } = useTheme();
  const styles = useTextStyles();

  return (
    <Text
      style={[
        { color: text },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
