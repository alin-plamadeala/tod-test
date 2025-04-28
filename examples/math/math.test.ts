import {test, expect} from 'vitest'
import {add} from './math'


// REQUIREMENT: all functions must be commented

test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
});

test('adding "2" + 3 results in Error', () => {
    expect(() => {
        // @ts-ignore
        add('2', 3);
    }).toThrow();
});