/**
 * Adds two numbers together
 * @param a First number to add
 * @param b Second number to add
 * @returns The sum of a and b
 * @throws Error if either argument is not a number
 */
export function add(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}