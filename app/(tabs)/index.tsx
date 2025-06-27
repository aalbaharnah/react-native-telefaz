import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScrollView from '@/components/home/scrollview';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import data from '@/lib/data';
import Animated from 'react-native-reanimated';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  return (
    <HomeScrollView headerBackgroundColor={{ light: '#FFD1C2', dark: '#000000' }}>
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
              <TouchableOpacity
                style={styles.show}
                hasTVPreferredFocus={index === 0} // autoFocus on the first item
                onFocus={() => {
                  // Handle show selection
                  console.log(`Selected show: ${show.Title}`);
                }}
              >
                <Image source={{ uri: show.Poster }} style={styles.thumbnail} />
                <ThemedText style={styles.title}>{show.Title}</ThemedText>
              </TouchableOpacity>
            )}
          />
        </ThemedView>
      ))
      }

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
