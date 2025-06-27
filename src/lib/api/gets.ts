// axios api layer for getting data from the server
import axios from 'axios';
import { getStorage } from '../async-storage';
import configs from './configs';



export async function getMovies(){
    return GET(`${configs.api}/?apikey=${configs.omdbApiKey}&type=movie&r=json`).then()
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
            error?.response?.data?.message ||
            error?.response?.data ||
            error?.message ||
            'Something went wrong',
        );
    }
}
