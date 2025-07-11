
import * as React from 'react';
import { View, StyleSheet, Text, Modal, Alert } from "react-native";
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/src/hooks/useTheme';
import { useScale } from '@/src/hooks/useScale';
import ProfileCircle from '@/src/components/choose-profile/profile-circle';
import { useProfileStore } from '@/src/zustand/profile.store';
import { Profile } from '@/src/lib/types';
import { useAlert } from '../providers/alert.provider';

const dummyProfiles: Profile[] = [{
    id: 1,
    name: "Ali",
    user_id: 1,
    profile_picture: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    favorites: [],
}]


export default function HomeScreen() {
    const theme = useTheme();
    const styles = useStyles();
    const scale = useScale();

    const setProfile = useProfileStore(s => s.setProfile)
    const { setAlert } = useAlert();

    const onChooseProfile = (profile: Profile) => {
        setProfile(profile);
        router.push('/home');
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.title}>Who is watching?</Text>
            <View style={styles.row}>
                {dummyProfiles.map((profile, i) => (
                    <ProfileCircle
                        key={profile.id}
                        delay={100 + (i * 50)}
                        name={profile.name}
                        onPress={() => onChooseProfile(profile)}
                    />

                ))}

                <ProfileCircle
                    name='Add Profile'
                    delay={100 + (dummyProfiles.length * 50)}
                    onPress={() => Alert.alert("Add Profile", "This feature is not implemented yet.")}
                >
                    <Ionicons name="add" size={scale * 50} color={theme.text} />
                </ProfileCircle>
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
        }
    });
}