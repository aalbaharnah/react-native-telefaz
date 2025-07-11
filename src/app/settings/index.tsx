import { Text, View, StyleSheet } from "react-native";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});