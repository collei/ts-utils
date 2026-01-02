
/**
 * The current date.
 * 
 * @returns Date
 */
const NOW = () => new Date();

/**
 * Date utils
 */
class DateUtils {
    constructor() {}

    /**
     * Parse the date according the format.
     * 
     * @param value: string 
     * @param format: string
     * @returns Date
     */
    parse(value: string, format: string = "yyyy-mm-dd"): Date {
        const normalized = value.replace(/[^a-zA-Z0-9]/g, "-");
        const normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
        const formatItems = normalizedFormat.split("-");
        const dateItems = normalized.split("-");

        const yearIndex = formatItems.indexOf("yyyy");
        const monthIndex = formatItems.indexOf("mm");
        const dayIndex = formatItems.indexOf("dd");
        const hourIndex = formatItems.indexOf("hh");
        const minutesIndex = formatItems.indexOf("ii");
        const secondsIndex = formatItems.indexOf("ss");

        const year: any = (yearIndex>=0) ? dateItems[yearIndex] : 0;
        const month: any = (monthIndex>=0) ? dateItems[monthIndex] : 1;
        const day: any = (dayIndex>=0) ? dateItems[dayIndex] : 0;

        const hour: any = (hourIndex>=0) ? dateItems[hourIndex] : 0;
        const minute: any = (minutesIndex>=0) ? dateItems[minutesIndex] : 0;
        const second: any = (secondsIndex>=0) ? dateItems[secondsIndex] : 0;

        return new Date(year,month-1,day,hour,minute,second);
    }

    /**
     * Parse an array of string date values according the format.
     * 
     * @param values: string[]
     * @param format: string
     * @returns any[]
     */
    parses(values: string[], format: string = "yyyy-mm-dd"): any[] {
        let result = [];

        for (const value of values) {
            result.push(this.parse(value, format));
        }

        return result;
    }
}


export const dates = new DateUtils();
export const now = NOW();
