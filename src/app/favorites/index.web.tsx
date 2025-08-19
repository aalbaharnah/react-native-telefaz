import ShowItem from "@/src/components/home/content-area/section/show-item";
import { useScale } from "@/src/hooks/useScale";
import { useFavoritesStore } from "@/src/zustand/favorites.store";
import { Text, View, StyleSheet } from "react-native";

export default function Favorites() {
    const favorites = useFavoritesStore(s => s.favorites)
    const styles = useStyles();

    return (
        <View style={styles.root}>
            <Text style={styles.text}>{`Favorites (${favorites.length})`}</Text>
            <View style={styles.container}>
                {favorites.length === 0 ? (
                    <Text style={styles.text}>No favorites yet!</Text>
                ) : (
                    favorites.map((favorite, index) => (
                        <ShowItem key={index.toString()} item={favorite} />
                    ))
                )}
            </View>
        </View>
    )
}

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: '#000',
            padding: 48 * scale,
        },
        container: {
            flex: 1,
            backgroundColor: '#000',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            padding: 24 * scale,
            gap: 16 * scale,
        },
        text: {
            color: '#fff',
            fontSize: 24 * scale,
            fontWeight: 'bold',
        },
    });
} 