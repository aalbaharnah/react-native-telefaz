
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


export function getItemText({ item, prefix }: { item: number, prefix: string }) {
    return prefix ? `${prefix}-${item}` : `${item}`;
};