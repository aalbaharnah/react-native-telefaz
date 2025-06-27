
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