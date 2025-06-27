import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScrollView from '@/src/components/home/home-scrollview';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useScale } from '@/src/hooks/useScale';
import data from '@/src/lib/data';
import Animated from 'react-native-reanimated';
import ShowItem from '@/src/components/home/section/show-item';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  return (
    <HomeScrollView>
      {data.map((item, index) => (
        <ThemedView key={index} style={styles.section}>
          <ThemedText>
            {item.section}
          </ThemedText>

          <Animated.FlatList
            horizontal
            data={item.data}
            keyExtractor={(item) => item.imdbID}
            contentContainerStyle={styles.shows}
            renderItem={({ item: show, index: stepIndex }) => (
              <ShowItem {...{ show, index: index + (stepIndex / 10) }} />
            )}
          />
        </ThemedView>
      ))}
    </HomeScrollView>
  );
}

const useHomeScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    section: {
      flexDirection: 'column',
      gap: 8 * scale,
    },
    shows: {
      flexDirection: 'row',
      // overflow: 'hidden',
      // paddingHorizontal: 16 * scale,
      // paddingVertical: 8 * scale,
      gap: 8 * scale,
      // marginBottom: 16 * scale,
      // backgroundColor: 'rgba(255, 255, 255, 0.1)',
      // borderRadius: 8 * scale,
    },
    show: {
      width: 300,
      height: 200,
      borderRadius: 10,
      overflow: 'hidden',
    },
    thumbnail: {
      width: '100%',
      height: 170,
      borderRadius: 10,
    },
    title: {
      marginTop: 5,
      fontSize: 18,
      color: 'white',
    },
    reactLogo: {
      height: 178 * scale,
      width: 290 * scale,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
};
