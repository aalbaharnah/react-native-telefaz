// this is a utility file that contains various helper functions and types used throughout the application

/**
 * Checks if a string is a valid JSON string.
 * @param str string to check if it is a valid JSON string
 * @returns boolean indicating whether the string is a valid JSON string
 */
export function isJsonString(str?: string): str is string {
    try {
        if (!str) {
            return false;
        }
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Generates an array of numbers from 0 to length - 1, or random numbers if randomize is true.
 * @param length number of items in the array
 * @param randomize boolean indicating whether to generate random numbers
 * @returns array of numbers
 */
export function generateData(length: number = 10, randomize: boolean = false) {
    return Array.from({ length }).map((_, index) => {
        if (randomize) {
            return Math.floor(Math.random() * 999);
        }

        return index;
    });
};


/**
 * check if the user was logged in less than an hour ago
 * @param loginAt string representing the last login time
 * @returns boolean indicating whether the user was logged in recently
 */
export function wasLoggedInRecently(loginAt?: string): boolean {
    if (!loginAt) return false;

    const lastLogin = new Date(loginAt);
    const now = new Date();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    return now.getTime() - lastLogin.getTime() <= oneHour;
}