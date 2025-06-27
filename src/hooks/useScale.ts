import { Platform, useWindowDimensions } from 'react-native';

export function useScale(): number {
  const { height } = useWindowDimensions();
  return Platform.isTV ? height / 1080 : 1;
}
