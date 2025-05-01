## Test Case 1: Adding Numbers

Feel free to comment on the AI-generated implementation and how well it meets the requirements of the test.

### Instructions:

1. Open the extension tab.
2. Select the test and implementation files

- Test file: `./src/math/math.test.ts`
- Implementation file: `./src/math/math.ts`

3. Click on 'Start TDD Session'

4. **Write a Unit Test**:

- In `math.test.ts`, write a simple unit test for a function called `add` that takes two numbers as parameters and
  returns their sum. The test should check if `add(2, 3)` returns `5`.

Example Test Code:

```typescript
import {test, expect} from 'vitest'
import {add} from './math'


test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
});
```

5. Save file and wait for the code generation
6. Add another test for a edge case - the situation when a string representation of a number is passed to the function
   and assert that the function throws an error

```typescript
test('adding "2" + 3 results in Error', () => {
    expect(() => {
        // @ts-ignore  
        add('2', 3);
    }).toThrow();
});
```

7. Save file and wait for the code generation
8. Make the function take variadic parameters (any number of arguments) and return their sum.

```typescript
test('adding 2 + 3 + 4 to equal 9', () => {
    expect(add(2, 3, 4)).toBe(9);
});
```

9. Add text comments using the below syntax to provide non-test requirements. The test file should now look similar to
   below:

```typescript
import {test, expect} from 'vitest'
import {add} from './math'

// REQUIREMENT: all functions must be commented

test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
});

test('adding 2 + 3 + 4 to equal 9', () => {
    expect(add(2, 3, 4)).toBe(9);
});

test('adding "2" + 3 results in Error', () => {
    expect(() => {
// @ts-ignore  
        add('2', 3);
    }).toThrow();
});
```

---  

## Test Case 2: Implementing a URL Query Parser

Feel free to comment on the AI-generated implementation and how well it meets the requirements of the test.

### Context:

You're building a client-side routing library that needs to parse URL query parameters.

#### Requirements:

* Create a function called `parseQueryParams` that parses URL query parameters into an object
* The function should accept a string containing query parameters (e.g., `?name=John&age=30`)

- The function should return an object with parameter names as keys and their values
- Handle special cases such as:
    - Multiple parameters with the same name should be collected in an array
    - Empty values should be included as empty strings
    - URL-encoded values should be properly decoded

#### Instructions

1. **Open the extension tab**.
2. Select the test and implementation files - Test file: `./src/query/query.test.ts`  - Implementation file:
   `./src/query/query.ts`
3. Click on 'Start TDD Session'
4. **Write Unit Tests**:
    - In `query.test.ts`, write unit tests for the URL Query Parser described above.
    - This should be done in a TDD-like manner (adding tests iteratively one at a time)
    - Use the assertions from below (the test cases section) to guide your implementation.

   Example Test Code:

```typescript

import {it, expect} from 'vitest';
import {parseQueryParams} from './query';

it('should parse basic query parameters', () => {
    const result = parseQueryParams('?name=John&age=30');
    expect(result).toEqual({name: 'John', age: '30'});
});

```

#### Test Cases/Assertions:

**Basic Parsing**

```typescript
parseQueryParams("?name=John&age=30")
// Should return { name: "John", age: "30" }
```

**Parsing without question mark prefix**

```typescript
parseQueryParams("name=John&age=30")
// Should return { name: "John", age: "30" }
```

**Full URLs**

```typescript
parseQueryParams("https://example.com/search?q=test&page=2")
// Should return { q: "test", page: "2" }
```

**Empty Query Strings**

```typescript
parseQueryParams("")
// Should return {}
```

**Empty Values**

```typescript
parseQueryParams("?name=&age=30")
// Should return { name: "", age: "30" }
```

**URL-Encoded Values**

```typescript
parseQueryParams("?name=John%20Doe&email=john%40example.com")
// Should return { name: "John Doe", email: "john@example.com" }
```

**Multiple Parameters with Same Name**

```typescript
parseQueryParams("?tags=javascript&tags=typescript&tags=react")
// Should return { tags: ["javascript", "typescript", "react"] }
```

**Mixed Parameters (Single and Multiple)**

```typescript
parseQueryParams("?name=John&tags=javascript&tags=typescript&age=30")
// Should return { name: "John", tags: ["javascript", "typescript"], age: "30" }
```

**Complex Query Strings**

```typescript
parseQueryParams("?user=john&category=books&sort=price&order=asc&price=10-50&tags=fiction&tags=bestseller&inStock")
// Should return {
//   user: "john",
//   category: "books",
//   sort: "price",
//   order: "asc",
//   price: "10-50",
//   tags: ["fiction", "bestseller"],
//   inStock: ""
// }
```

**Special Parameter Names**

```typescript
parseQueryParams("?_underscore=value&dash-param=test&dot.param=example")
// Should return { "_underscore": "value", "dash-param": "test", "dot.param": "example" }
```

**Hash Fragments**

```typescript
parseQueryParams("?name=John&age=30#section1")
// Should return { name: "John", age: "30" }
```

