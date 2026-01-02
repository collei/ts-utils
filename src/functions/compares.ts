import { dates } from "./dates";

/**
 * Struct to describe a divergent value between two structures.
 */
export interface DivergentValueInfo {
    name: string;
    value: any;
    oldValue: any;
};

/**
 * Complex/compound comparison tools.
 */
class CompareUtils {
    constructor() {}

    /**
     * List values diverging between the (sa) and (sb) structures.
     * If an empty list is returned, it means (sa) and (sb) are probably equal.
     * To enable strict comparison, pass true to strictCompare parameter.
     *  
     * @param sa: any
     * @param sb: any
     * @param strictCompare: boolean = false 
     * @returns DivergentValueInfo[]
     */
    getDivergentValues(sa: any, sb: any, strictCompare: boolean = false): DivergentValueInfo[] {
        const keys_a = Object.keys(sa);
        const keys_b = Object.keys(sb);
        const is_object = (obj: any) => obj != null && typeof obj === 'object';
        let result: DivergentValueInfo[] = [];

        if (keys_a.length !== keys_b.length) {
            return [{
                name: "*",
                value: (sa),
                oldValue: (sb)
            }];
        }

        for (const key of keys_a) {
            const val_a = sa[key];
            const val_b = sb[key];
            let inequal = false;
            let sublist : DivergentValueInfo[] = [];
            //
            if (val_a instanceof Date && val_b instanceof Date) {
                inequal = ! this.areSameDate(val_a, val_b);
            } else if (val_a instanceof Date) {
                const date_b = dates.parse(val_b);
                inequal = ! this.areSameDate(val_a, date_b);
            } else if (val_b instanceof Date) {
                const date_a = dates.parse(val_a);
                inequal = ! this.areSameDate(date_a, val_b);
            } else if (is_object(val_a) && is_object(val_b)) {
                sublist = this.getDivergentValues(val_a, val_b);
                inequal = sublist.length > 0;
            } else {
                inequal = ! (strictCompare ? (val_a === val_b) : (val_a == val_b));
            }
            //
            if (inequal) {
                if (sublist.length > 0) {
                    for (const sub of sublist) {
                        result.push({
                            name: key+"."+sub.name,
                            value: (sub.oldValue),
                            oldValue: (sub.value)
                        });
                    }
                } else {
                    result.push({
                        name: "*",
                        value: (sa),
                        oldValue: (sb)
                    });
                }
            }
        }

        return result;
    }

    /**
     * Compares dates.
     * 
     * @param d1: Date 
     * @param d2: Date
     * @returns boolean
     */
    areSameDate(d1: Date, d2: Date): boolean {
        if ((! (d1 instanceof Date)) || (! (d2 instanceof Date))) {
            return false;
        }

        return (d1.valueOf() == d2.valueOf());
    }

    /**
     * Checks if both structures have any divergent values in between.
     * 
     * @param v1: any 
     * @param v2: any
     * @returns boolean
     */
    areDivergent(v1: any, v2: any): boolean {
        const divergent = this.getDivergentValues(v1, v2);

        return (divergent.length > 0);
    }
}

export const compares = new CompareUtils();
