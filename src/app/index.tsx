
import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { useScale } from '../hooks/useScale';
import EaseInView from '../components/ease-in-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useProfileStore } from '../zustand/profile.store';
import { Profile } from '../lib/types';

export default function HomeScreen() {
    const theme = useTheme();
    const styles = useStyles();
    const scale = useScale();

    const setProfile = useProfileStore(s => s.setProfile)

    const dummyProfiles: Profile[] = [{
        id: 1,
        name: "Ali",
        user_id: 1,
        profile_picture: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        favorites: [],
    }]

    const onChooseProfile = (profile: Profile) => {
        setProfile(profile);
        router.replace('/home');
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.title}>Who is watching?</Text>
            <View style={styles.row}>
                {dummyProfiles.map((profile, i) => (
                    <EaseInView
                        key={profile.id}
                        delay={100 + (i * 0.025)}
                        style={{ alignItems: 'center', justifyContent: 'center', gap: 10 * scale }}>
                        <Pressable
                            onPress={() => onChooseProfile(profile)}
                            style={state => [
                                styles.profile,
                                state.focused && { borderColor: theme.tint, borderWidth: 4 },
                                state.pressed && { transform: [{ scale: 0.95 }] },
                            ]}>
                        </Pressable>
                        <Text style={{ color: theme.text, fontSize: scale * 24 }}>{profile.name}</Text>
                    </EaseInView>
                ))}
                <EaseInView delay={200} style={{ alignItems: 'center', justifyContent: 'center', gap: 10 * scale }}>
                    <Pressable
                        onPress={() => { }}
                        style={state => [
                            styles.profile,
                            state.focused && { borderColor: theme.tint, borderWidth: 4 },
                            state.pressed && { transform: [{ scale: 0.95 }] },
                        ]}>
                        <Ionicons name="add" size={scale * 50} color={theme.text} />
                    </Pressable>
                    <Text style={{ color: theme.text, fontSize: scale * 18 }}>Add Profile</Text>
                </EaseInView>
            </View>
        </View >
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