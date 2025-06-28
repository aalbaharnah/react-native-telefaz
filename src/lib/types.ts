
export type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    profiles: Profile[];
}

export type Profile = {
    id: number;
    name: string;
    user_id: number;
    profile_picture: string | null;
    created_at: string;
    updated_at: string;
    favorites: Show[];
}

export type Show = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    first_air_date?: string;
    id: number;
    original_language: string;
    original_title?: string;
    original_name?: string;
    overview?: string;
    popularity: number;
    poster_path: string;
    release_date?: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type PlayListItem = {
    id: number;
    show_id: number;
    profile_id: number;
    created_at: string;
    updated_at: string;
    current_time: number;
}