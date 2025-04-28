import { describe, it, expect } from 'vitest';
import { parseQueryParams } from './query';



describe('parseQueryParams', () => {
    it('should parse basic query parameters', () => {
        const result = parseQueryParams('?name=John&age=30');
        expect(result).toEqual({ name: 'John', age: '30' });
    });

    it('should handle query string without the leading question mark', () => {
        const result = parseQueryParams('name=John&age=30');
        expect(result).toEqual({ name: 'John', age: '30' });
    });

    it('should return an empty object for empty query strings', () => {
        expect(parseQueryParams('')).toEqual({});
        expect(parseQueryParams('?')).toEqual({});
    });

    it('should handle parameters with empty values', () => {
        const result = parseQueryParams('?name=&age=30');
        expect(result).toEqual({ name: '', age: '30' });
    });

    it('should handle parameters without values', () => {
        const result = parseQueryParams('?name&age=30');
        expect(result).toEqual({ name: '', age: '30' });
    });

    it('should decode URL-encoded values', () => {
        const result = parseQueryParams('?name=John%20Doe&email=john%40example.com');
        expect(result).toEqual({ name: 'John Doe', email: 'john@example.com' });
    });

    it('should handle special characters in parameter values', () => {
        const result = parseQueryParams('?search=hello+world&filter=price:$50');
        expect(result).toEqual({ search: 'hello world', filter: 'price:$50' });
    });

    it('should collect multiple parameters with the same name into an array', () => {
        const result = parseQueryParams('?tags=javascript&tags=typescript&tags=react');
        expect(result).toEqual({ tags: ['javascript', 'typescript', 'react'] });
    });

    it('should handle mixed parameters (single and multiple)', () => {
        const result = parseQueryParams('?name=John&tags=javascript&tags=typescript&age=30');
        expect(result).toEqual({
            name: 'John',
            tags: ['javascript', 'typescript'],
            age: '30'
        });
    });

    it('should handle complex query strings with various types of parameters', () => {
        const queryString = '?user=john&category=books&sort=price&order=asc&price=10-50&tags=fiction&tags=bestseller&inStock';
        const result = parseQueryParams(queryString);

        expect(result).toEqual({
            user: 'john',
            category: 'books',
            sort: 'price',
            order: 'asc',
            price: '10-50',
            tags: ['fiction', 'bestseller'],
            inStock: ''
        });
    });

    it('should handle query string from a full URL', () => {
        const fullUrl = 'https://example.com/search?q=test&page=2';
        const result = parseQueryParams(fullUrl);

        // It should only parse the query parameters, not the full URL
        expect(result).toEqual({ q: 'test', page: '2' });
    });

    it('should handle unusual but valid query parameter names', () => {
        const result = parseQueryParams('?_underscore=value&dash-param=test&dot.param=example');
        expect(result).toEqual({
            '_underscore': 'value',
            'dash-param': 'test',
            'dot.param': 'example'
        });
    });

    it('should handle numerical and boolean-like parameter values', () => {
        const result = parseQueryParams('?count=42&active=true&verified=false');
        // All values are still strings
        expect(result).toEqual({ count: '42', active: 'true', verified: 'false' });
    });

    it('should handle edge case with only parameter names and no values', () => {
        const result = parseQueryParams('?a&b&c');
        expect(result).toEqual({ a: '', b: '', c: '' });
    });

    it('should handle a query string with hash fragment', () => {
        const result = parseQueryParams('?name=John&age=30#section1');
        // Should ignore the hash fragment
        expect(result).toEqual({ name: 'John', age: '30' });
    });
});