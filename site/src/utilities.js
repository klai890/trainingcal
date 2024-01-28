// A file containing some useful helper functions.

/**
 * @param Date d, int i: d is the day to add i days to
 * @returns i days added to Date d
 */

export function addDays(d, i) {
    return d.valueOf() + 24*i*60*60*1000;
}

/**
 * @param Date a, Date b
 * @returns A sorting for Dates.
 */

export function sortDates(a, b) {
    return a - b;
}

/**
 * prevMon(): Retrieves the Monday before a date.
 * @param date: Date 
 * @returns Date: Monday, the Monday prior to date @ 11:59pm
 */
export function prevMon(date) {    

    var day = date.getDay()
    var mon = new Date(date.getTime());

    // TODO: small bug – if it's monday but before 11:59pm, prevMon is actually AFTER date.
    var diff = day - 1; // # days to monday
    mon.setDate(date.getDate() - diff);

    // 11:59pm
    mon.setHours(0);
    mon.setMinutes(0);
    mon.setSeconds(0);

    return mon;
}

/**
 * Returns an Array of mondays between af and bf.
 * @param bf Date to stop at
 * @param af Date to start at
 * @returns An Array of Mondays between af and bf
 */
export function getMondays (bf, af) {
    var d = prevMon(af);
    const bfValue = bf.valueOf();
    var result= [];

    while (d.valueOf() <= bfValue) {
        result.push(new Date(d)); // create a new object. you don't want an array of references to the same object.
        d.setDate(d.getDate() + 7)
    }

    return result;
}

/**
 * inDateArr(): Takes in a date and an array of dates, and determines if the date is in the array.
 * @param {*} target 
 * @param {*} dateArr 
 * @returns whether target is in dateArr
 */
export function inDateArr(target, dateArr){
    target = new Date(target);
    for (var i = 0; i < dateArr.length; i++) {
        var d = new Date(dateArr[i]);
        if (d.valueOf() === target.valueOf()) {
            return true;
        }
    }
    return false;
}

/**
 * dateToStr(): Takes in a date and formats it into a string (in my particular way): ex: 1/9/2024
 * @param {*} d : Date
 * @returns String
 */
export function dateToStr(d){
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + JSON.stringify(d.getFullYear());
}
