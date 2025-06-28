import * as React from "react";
import { ScrollView, Text, TVFocusGuideView, StyleSheet } from "react-native";
import { useQueries } from "@tanstack/react-query";
import api from "@/src/lib/api";
import { useScale } from "@/src/hooks/useScale";
import FocusableBox from "@/src/components/focusable-box";
import { useFavoritesStore } from "@/src/zustand/favorites.store";
import { useProfileStore } from "@/src/zustand/profile.store";
import Section from "./section";
import ShowPreview from "./show-preview";
import Categories from "./categories";
import { Show } from "@/src/lib/types";

const ContentArea = React.forwardRef((_, forwardedRef: any) => {
    const styles = useStyles();
    const profile = useProfileStore(p => p.profile);
    const favorites = useFavoritesStore(s => s.favorites);

    const [movies, series, documentries] = useQueries({
        queries: [
            {
                queryKey: ["movies"],
                queryFn: () => api.gets.getMovies(),
            },
            {
                queryKey: ["series"],
                queryFn: () => api.gets.getTVShows(),
            },
            {
                queryKey: ["documentaries"],
                queryFn: () => api.gets.getDocumentaryShows(),
            }
        ],
    });

    return (
        <TVFocusGuideView ref={forwardedRef} autoFocus style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>
                {`Hi ${profile?.name}, welcome back!`}
            </Text>
            <ShowPreview />
            <ScrollView>

                <Section
                    data={movies?.data}
                    loading={movies.isLoading}
                    title="Movies"
                />
                <Section
                    data={series.data}
                    loading={series.isLoading}
                    title="Series"
                />
                {favorites.length > 0 && (
                    <Section
                        data={favorites}
                        loading={false}
                        title="Favorites"
                    />
                )}
                <Categories title="genres" />
                <TVFocusGuideView style={styles.cols}>
                    <Col title="" data={documentries.data} />
                </TVFocusGuideView>

            </ScrollView>
        </TVFocusGuideView>
    );
});

const Col = ({ title, data }: { title: string, data?: Show[] }) => {
    const styles = useStyles();

    return (
        <TVFocusGuideView autoFocus style={styles.col}>
            <Text style={styles.colTitle}>{title}</Text>
            {data?.map((item, index) => (
                <FocusableBox key={index.toString()} text={item.original_name} style={styles.colItem} />
            ))}
        </TVFocusGuideView>
    );
};

export default React.memo(ContentArea);

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        pageTitle: {
            fontSize: 48 * scale, margin: 10 * scale,
            fontFamily: "IBMPlexSansArabic-Bold",
            color: '#fff'
        },
        focusToSideMenuBtn: {
            height: 100 * scale,
            marginHorizontal: 16 * scale,
        },
        col: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 8 * scale,
        },
        colTitle: {
            margin: 10 * scale,
            fontSize: 24 * scale,
            color: '#fff',
        },
        cols: {
            flexDirection: 'row',
            paddingHorizontal: 16 * scale,
        },
        colItem: {
            width: '100%',
            height: 100 * scale,
            marginBottom: 5 * scale,
        },
    })
}