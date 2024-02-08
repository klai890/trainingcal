// A file containing some useful helper functions.
import data from '../../data/data2.json'
// export const workoutTypes = ['run', 'ride', 'swim', 'strength', 'other'];


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
    if (day == 0) {
        day = 7;
    }
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
        if (d.getTime() == target.getTime()) {
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

/**
 * capitalize(): Returns string str with the first letter uppercase and the rest lowercase
 * @param {*} str 
 * @returns str, but modified as detailed above
 * Precondition: String is one word
 */
export function capitalize(str) {
    str = str.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.substring(1);
    return str;
}

/**
 * numHours(): Returns the largest amount of hours within mins minutes.
 * @param {*} mins 
 * @returns largest number of hours that fit into the amount of minutes
 */
export function numHours(mins){
    var hr = Math.floor(mins / 60);
    return hr;
}

/**
 * remainingMins(): returns the number of minutes remaining after all hours retrieved
 * ex: remainingMins(345) = 45, because 345mins = 5hr, 45min
 * @param {*} mins 
 * @returns minutes remaining after hours accounted for
 */
export function remainingMins(mins){
    return  mins - numHours(mins)*60;
}


/**
 * For a workout to be added on Date date, generates an ID of format %m%d%yy%dayInt%workoutNum
 * Ex: if its the second workout of tuesday (2) of week 1/29/24, id is 1292421 (date part: 12924 the prev mon),
 * (2) is tuesday, (1) is the second workout
 * note: prepending a 0 to the day of month if it is less than 10 so it is always 2 digits.
 * @param {*} date Date workout is added to
 * @returns workout ID For the workout to be added
 */
function generateWorkoutId(date){
    var mon = prevMon(date);
    var numberdate = mon.getDate();
    if (mon.getDate() < 10) {
        numberdate = "0" + mon.getDate();
    }
    var datePart = (mon.getMonth() + 1) + "" +  numberdate + "" + JSON.stringify(mon.getFullYear()).substring(2);
    var day = date.getDay() + "";
    var workoutNum;

    if (date.hasOwnProperty(dateToStr(mon))){
        if (date[mon].hasOwnProperty(day)) {
            workoutNum = data[dateToStr(mon)][day].length;
        }
        else {
            workoutNum = "0"
        }
    }
    else {
        workoutNum = "0";
    }

    return datePart + day + workoutNum;
}

/**
 * Formats the workout data to add to the master data object in data.json
 * @param {*} type of workout (either 'swim', 'run, 'ride', 'other', 'strength)
 * @param {*} title of workout
 * @param {*} duration of workout
 * @param {*} description of workout
 * @param {*} date of workout
 */
export async function createWorkout(type, title, duration, description, date) {
    // Corresponding Monday:
    var mon = dateToStr(prevMon(date));
    var day = date.getDay() + "";
    var id = generateWorkoutId(date);

    // First item added to week in JSON.
    if (!data.hasOwnProperty(mon)) {
        data[mon] = {};
    }

    // First item added to day in JSON
    if (!data[mon].hasOwnProperty(day)){
        data[mon][day] = [];
    }

    data[mon][day].push({
        "id": parseInt(id),
        "type": type.toLowerCase(),
        "duration": parseInt(duration),
        "title": title,
        "description": description
    })

    // POST /api/login
    const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          // Make sure backend knows we're sending JSON data!!
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(t => t.json())

    console.log("CALLED HANDLER")
    console.log(res.message)
}

/**
 * Deletes workout of ID id
 * @param {*} id of workout to delete
 */
export async function deleteWorkout(id) {
    id = id + "";

    // Get rid of the workout # and day value...
    // Note, this does assume I'll do at most 10 workouts in one day
    // ...I think that's a fairly reasonable assumption.
    var indexWorkout = id.substring(id.length - 1);
    var day = id.substring(id.length - 2, id.length - 1);
    var datestr = id.substring(0, id.length - 2)
    var year = datestr.substring(datestr.length - 2);
    var monthday = datestr.substring(0, datestr.length - 2);
    var dayofmonth = monthday.substring(monthday.length - 2);
    var month = datestr.substring(0, monthday.length - 2);

    // Integer vars
    var dd = parseInt(dayofmonth);

    // Get prev mon to find key in JSON obj data
    var key = day;

    var dateOfWorkout = new Date(month + "/" + dd + "/" + year);
    var mon = dateToStr(dateOfWorkout);

    // Remove elemnt from array.
    data[mon][key].splice(indexWorkout, 1);
    console.log(data[mon][key])

    // Send new data array
    const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
            // Make sure backend knows we're sending JSON data!!
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).then(t => t.json())

    console.log("CALLED HANDLER")
    console.log(res.message)
    

}

/**
 * Modifies workout of ID id
 * @param {*} title (maybe new title) of workout
 * @param {*} duration (maybe new duration)
 * @param {*} description (maybe new description)
 * @param {*} id of workout
 */
export function modifyWorkout(title, duration, description, id){

}