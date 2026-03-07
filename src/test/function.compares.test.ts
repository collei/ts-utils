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
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const B = {
			foo: "bar",
			primes: [2,3,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const result = compares.getDivergentValues(A, B);
		expect(result.length).toBe(0);
	});
	test('getDivergentValues(A, B) should return a list with three items when objects A and B have three divergent values', () => {
		const A = {
			foo: "bar",
			primes: [2,3,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const B = {
			foo: "bar",
			primes: [2,4,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 79,
				birthDate: new Date(2001,8,11,9,0,12)
			}
		};
		const result = compares.getDivergentValues(A, B);
		expect(result.length).toBe(3);
	});
	test('getDivergentValues(A, B) should return array-like element name for divergent value in an array', () => {
		const A = {
			foo: "bar",
			primes: [2,3,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const B = {
			foo: "bar",
			primes: [2,4,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const result = compares.getDivergentValues(A, B);
		expect(result[0]?.name).toBe("primes[1]");
	});
});

describe("testing compares.areSameDate", () => {
	test('areSameDate(d1, d2) should return false when d1 is not date', () => {
		const d1 = "invalid date" as any;
		const d2 = new Date(2001,8,11,8,7,6);
		const result = compares.areSameDate(d1, d2);
		expect(result).toBe(false);
	});
	test('areSameDate(d1, d2) should return false when d2 is not date', () => {
		const d1 = new Date(2001,8,11,8,7,6);
		const d2 = "invalid date" as any;
		const result = compares.areSameDate(d1, d2);
		expect(result).toBe(false);
	});
	test('areSameDate(d1, d2) should return false when d1 and d2 are not date', () => {
		const d1 = "invalid date" as any;
		const d2 = "invalid date" as any;
		const result = compares.areSameDate(d1, d2);
		expect(result).toBe(false);
	});
	test('areSameDate(d1, d2) should return true when same date', () => {
		const d1 = new Date(2001,8,11,8,7,6);
		const d2 = new Date(2001,8,11,8,7,6);
		const result = compares.areSameDate(d1, d2);
		expect(result).toBe(true);
	});
	test('areSameDate(d1, d2) should return false when not same date', () => {
		const d1 = new Date(2001,8,11,8,7,6);
		const d2 = new Date(2001,8,11,8,7,7);
		const result = compares.areSameDate(d1, d2);
		expect(result).toBe(false);
	});
});

describe('testing compares.areDivergent', () => {
	test('areDivergent("", "") should return false', () => {
		const result = compares.areDivergent("", "");
		expect(result).toBe(false);
	});
	test('areDivergent(0, 0) should return false', () => {
		const result = compares.areDivergent(0, 0);
		expect(result).toBe(false);
	});
	test('areDivergent({}, {}) should return false', () => {
		const result = compares.areDivergent({}, {});
		expect(result).toBe(false);
	});
	test('areDivergent(A, B) should return false when objects A and B are A == B even A !== B', () => {
		const A = {
			foo: "bar",
			primes: [2,3,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const B = {
			foo: "bar",
			primes: [2,3,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const result = compares.areDivergent(A, B);
		expect(result).toBe(false);
	});
	test('areDivergent(A, B) should return true when objects A and B have any divergent values', () => {
		const A = {
			foo: "bar",
			primes: [2,3,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 97,
				birthDate: new Date(2001,8,11,9,0,13)
			}
		};
		const B = {
			foo: "bar",
			primes: [2,4,5,7,11,13,17,19],
			person: {
				name: "John Dee",
				age: 79,
				birthDate: new Date(2001,8,11,9,0,12)
			}
		};
		const result = compares.areDivergent(A, B);
		expect(result).toBe(true);
	});
});