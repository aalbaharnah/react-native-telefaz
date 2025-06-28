
import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { useScale } from '../hooks/useScale';
import EaseInView from '../components/ease-in-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function HomeScreen() {
    const theme = useTheme();
    const styles = useStyles();
    const scale = useScale();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.title}>Who is watching?</Text>
            <View style={styles.row}>
                <EaseInView delay={150} style={{ alignItems: 'center', justifyContent: 'center', gap: 10 * scale }}>
                    <Pressable
                        onPress={() => { router.push('/home') }}
                        style={state => [
                            styles.profile,
                            state.focused && { borderColor: theme.tint, borderWidth: 4 },
                        ]}>
                        <Text style={{ color: theme.text }}>User Profile</Text>
                    </Pressable>
                    <Text style={{ color: theme.text, fontSize: scale * 18 }}>Add Profile</Text>
                </EaseInView>
                <EaseInView delay={200} style={{ alignItems: 'center', justifyContent: 'center', gap: 10 * scale }}>
                    <Pressable
                        onPress={() => { }}
                        style={state => [
                            styles.profile,
                            state.focused && { borderColor: theme.tint, borderWidth: 4 },
                        ]}>
                        <Ionicons name="add" size={scale * 50} color={theme.text} />
                    </Pressable>
                    <Text style={{ color: theme.text, fontSize: scale * 18 }}>Add Profile</Text>
                </EaseInView>
            </View>
        </View>
    );
};

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20 * scale,
        },
        title: {
            fontSize: 36 * scale,
            fontFamily: "IBMPlexSansArabic-Bold",
            color: '#fff',
            margin: 20,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20 * scale,
        },
        profile: {
            width: 200 * scale,
            height: 200 * scale,
            backgroundColor: '#333333',
            borderRadius: 100 * scale,
            alignItems: 'center',
            justifyContent: 'center',
        }
    });
}