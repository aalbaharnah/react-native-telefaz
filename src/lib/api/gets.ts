// axios api layer for getting data from the server
import axios from 'axios';
import { getStorage } from '../async-storage';
import configs from './configs';
import { Show } from '../types';


// Fetch popular movies, TV shows, and documentaries from The Movie Database (TMDB) API
export async function getMovies() {
    return GET<{ results: Show[] }>(`https://api.themoviedb.org/3/movie/popular?api_key=${configs.tmdbApiKey}&page=1`)
        .then(res => res.results);
}

// Fetch popular TV shows from The Movie Database (TMDB) API
export async function getTVShows() {
    return GET<{ results: Show[] }>(`https://api.themoviedb.org/3/tv/popular?api_key=${configs.tmdbApiKey}&page=1`)
        .then(res => res.results);
}

// Fetch documentary shows from The Movie Database (TMDB) API
export async function getDocumentaryShows() {
    return GET<{ results: Show[] }>(`https://api.themoviedb.org/3/discover/tv?api_key=${configs.tmdbApiKey}&with_genres=99&page=1`)
        .then(res => res.results);
}


/**
 * universal GET function
 * @param url string url
 * @param token user token
 * @returns axios response
 */
async function GET<Result = any>(url: string, token?: string | null) {
    try {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            const fallbackToken = await getStorage('auth.token');
            if (fallbackToken) {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${fallbackToken}`;
            }
        }

        const response = await axios.get<Result>(url);
        return response.data;
    } catch (error) {
        throw new Error(
            //@ts-ignore
            error?.response?.data?.message || error?.response?.data || error?.message ||
            'Something went wrong',
        );
    }
}
