import {it, expect} from 'vitest';
import {parseQueryParams} from './query';


it('should parse basic query parameters', () => {
    const result = parseQueryParams('?name=John&age=30');
    expect(result).toEqual({name: 'John', age: '30'});
});
