import { isJsonString, generateData, wasLoggedInRecently } from '../../lib/utils';

describe('Utils Functions', () => {
    describe('isJsonString', () => {
        it('returns true for valid JSON strings', () => {
            expect(isJsonString('{"key": "value"}')).toBe(true);
            expect(isJsonString('{"name": "John", "age": 30}')).toBe(true);
            expect(isJsonString('[]')).toBe(true);
            expect(isJsonString('[1, 2, 3]')).toBe(true);
            expect(isJsonString('true')).toBe(true);
            expect(isJsonString('false')).toBe(true);
            expect(isJsonString('null')).toBe(true);
            expect(isJsonString('123')).toBe(true);
            expect(isJsonString('"hello"')).toBe(true);
        });

        it('returns false for invalid JSON strings', () => {
            expect(isJsonString('invalid json')).toBe(false);
            expect(isJsonString('{"key": value}')).toBe(false); // missing quotes around value
            expect(isJsonString('{"key": "value",}')).toBe(false); // trailing comma
            expect(isJsonString('{key: "value"}')).toBe(false); // missing quotes around key
            expect(isJsonString('undefined')).toBe(false);
            expect(isJsonString('NaN')).toBe(false);
        });

        it('returns false for undefined, null, or empty string', () => {
            expect(isJsonString(undefined)).toBe(false);
            expect(isJsonString('')).toBe(false);
        });

        it('handles edge cases correctly', () => {
            expect(isJsonString('{}')).toBe(true); // empty object
            expect(isJsonString('0')).toBe(true); // zero
            expect(isJsonString('-1')).toBe(true); // negative number
            expect(isJsonString('3.14')).toBe(true); // decimal
        });
    });

    describe('generateData', () => {
        it('generates array with default length of 10', () => {
            const result = generateData();
            expect(result).toHaveLength(10);
            expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('generates array with specified length', () => {
            const result = generateData(5);
            expect(result).toHaveLength(5);
            expect(result).toEqual([0, 1, 2, 3, 4]);
        });

        it('generates array with length of 0', () => {
            const result = generateData(0);
            expect(result).toHaveLength(0);
            expect(result).toEqual([]);
        });

        it('generates array with length of 1', () => {
            const result = generateData(1);
            expect(result).toHaveLength(1);
            expect(result).toEqual([0]);
        });

        it('generates sequential numbers when randomize is false', () => {
            const result = generateData(3, false);
            expect(result).toEqual([0, 1, 2]);
        });

        it('generates random numbers when randomize is true', () => {
            const result = generateData(5, true);
            expect(result).toHaveLength(5);

            // Check that all values are numbers and within expected range (0-998)
            result.forEach(num => {
                expect(typeof num).toBe('number');
                expect(num).toBeGreaterThanOrEqual(0);
                expect(num).toBeLessThan(999);
            });
        });

        it('generates different arrays when randomize is true (probabilistic test)', () => {
            const result1 = generateData(10, true);
            const result2 = generateData(10, true);

            // It's extremely unlikely that two random arrays would be identical
            expect(result1).not.toEqual(result2);
        });

        it('handles large arrays', () => {
            const result = generateData(1000);
            expect(result).toHaveLength(1000);
            expect(result[0]).toBe(0);
            expect(result[999]).toBe(999);
        });
    });

    describe('wasLoggedInRecently', () => {
        beforeEach(() => {
            // Mock Date.now() to have consistent test results
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2025-07-11T12:00:00Z'));
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('returns false for undefined loginAt', () => {
            expect(wasLoggedInRecently(undefined)).toBe(false);
        });

        it('returns false for empty string loginAt', () => {
            expect(wasLoggedInRecently('')).toBe(false);
        });

        it('returns true for login within the last hour', () => {
            // 30 minutes ago
            const thirtyMinutesAgo = new Date('2025-07-11T11:30:00Z').toISOString();
            expect(wasLoggedInRecently(thirtyMinutesAgo)).toBe(true);

            // 1 minute ago
            const oneMinuteAgo = new Date('2025-07-11T11:59:00Z').toISOString();
            expect(wasLoggedInRecently(oneMinuteAgo)).toBe(true);

            // Exactly 1 hour ago (should still be true as it's <= 1 hour)
            const oneHourAgo = new Date('2025-07-11T11:00:00Z').toISOString();
            expect(wasLoggedInRecently(oneHourAgo)).toBe(true);
        });

        it('returns false for login more than an hour ago', () => {
            // 1 hour and 1 minute ago
            const overOneHourAgo = new Date('2025-07-11T10:59:00Z').toISOString();
            expect(wasLoggedInRecently(overOneHourAgo)).toBe(false);

            // 2 hours ago
            const twoHoursAgo = new Date('2025-07-11T10:00:00Z').toISOString();
            expect(wasLoggedInRecently(twoHoursAgo)).toBe(false);

            // Yesterday
            const yesterday = new Date('2025-07-10T12:00:00Z').toISOString();
            expect(wasLoggedInRecently(yesterday)).toBe(false);
        });

        it('handles different date string formats', () => {
            // ISO string
            const isoString = '2025-07-11T11:30:00.000Z';
            expect(wasLoggedInRecently(isoString)).toBe(true);

            // Date string without milliseconds
            const dateString = '2025-07-11T11:30:00Z';
            expect(wasLoggedInRecently(dateString)).toBe(true);

            // Local date string (if valid)
            const localDate = new Date('2025-07-11T11:30:00Z').toString();
            expect(wasLoggedInRecently(localDate)).toBe(true);
        });

        it('handles invalid date strings', () => {
            expect(wasLoggedInRecently('invalid-date')).toBe(false);
            expect(wasLoggedInRecently('not-a-date')).toBe(false);
            expect(wasLoggedInRecently('2025-13-45')).toBe(false); // invalid month/day
        });

        it('handles edge case exactly at one hour boundary', () => {
            // Exactly 1 hour ago (3600 seconds = 1 hour)
            const exactlyOneHourAgo = new Date('2025-07-11T11:00:00.000Z').toISOString();
            expect(wasLoggedInRecently(exactlyOneHourAgo)).toBe(true);

            // 1 millisecond over one hour
            const oneMillisecondOver = new Date('2025-07-11T10:59:59.999Z').toISOString();
            expect(wasLoggedInRecently(oneMillisecondOver)).toBe(false);
        });

        it('handles future dates (should return true)', () => {
            // Future login time (shouldn't happen in real scenario, but test edge case)
            const futureDate = new Date('2025-07-11T13:00:00Z').toISOString();
            expect(wasLoggedInRecently(futureDate)).toBe(true);
        });
    });
});
