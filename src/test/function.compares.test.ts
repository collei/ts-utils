import { compares } from "../functions/compares";

describe('testing compares.getDivergentValues', () => {
    test('getDivergentValues("", "") should return empty list', () => {
        const result = compares.getDivergentValues("", "");
        expect(result.length).toBe(0);
    });
    test('getDivergentValues(0, 0) should return empty list', () => {
        const result = compares.getDivergentValues(0, 0);
        expect(result.length).toBe(0);
    });
    test('getDivergentValues({}, {}) should return empty list', () => {
        const result = compares.getDivergentValues({}, {});
        expect(result.length).toBe(0);
    });
    test('getDivergentValues(A, B) should return empty list when objects A and B are A == B even A !== B', () => {
        const A = {
            foo: "bar",
            primes: [2,3,5,7,11,13,17,19],
            person: {
                name: "John Dee",
                age: 97
            }
        };
        const B = {
            foo: "bar",
            primes: [2,3,5,7,11,13,17,19],
            person: {
                name: "John Dee",
                age: 97
            }
        };
        const result = compares.getDivergentValues(A, B);
        expect(result.length).toBe(0);
    });
    test('getDivergentValues(A, B).length should return 2 when objects A and B have two divergent values', () => {
        const A = {
            foo: "bar",
            primes: [2,3,5,7,11,13,17,19],
            person: {
                name: "John Dee",
                age: 97
            }
        };
        const B = {
            foo: "bar",
            primes: [2,4,5,7,11,13,17,19],
            person: {
                name: "John Dee",
                age: 79
            }
        };
        const result = compares.getDivergentValues(A, B);
        expect(result.length).toBe(2);
    });
});