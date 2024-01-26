import data from '../../../data/data.json'
import Day from './Day';
import Summary from './Summary'

/**
 * @param Date d, int i: d is the day to add i days to
 * @returns i days added to Date d
 */

function addDays(d, i) {
    return d.valueOf() + 24*i*60*60*1000;
}

/**
 * @param Date a, Date b
 * @returns A sorting for Dates.
 */

function sortDates(a, b) {
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
function getMondays (bf, af) {
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
function inDateArr(target, dateArr){
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
function dateToStr(d){
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + JSON.stringify(d.getFullYear());
}

export default function Calendar(){
    // Example week object:
    // {
    //     "0": [
    //         {
    //             "type": "run",
    //             "duration": 30,
    //             "title": "Easy Run",
    //             "description": ""
    //         }
    //     ],
    //     "1": [
    //         {
    //             "type": "swim",
    //             "duration": 90,
    //             "title": "Swim",
    //             "description": ""
    //         }
    //     ],
    // }

    // 1. Load all data from .JSON files
    // 2. Collect all dates into an array and determine which is the earliest date. Store into earliestDate.
    // 3. Generate an array of Dates, dates, which span from earliestDate to 10 weeks from today's date
    // 4. Loop thru arrDates (all the Mondays):
        // a. If date not in .JSON file: 
        //      Loop thru Dates from date to the Sunday after (for loop, i < 7, add 1 day each time)
        //      For each day, generate a Day component with date=d and workouts=[]
        //      Then, generate Summary component, with totalTime = 0, bikeTime = 0, runTime = 0, swimTime = 0, otherTime = 0

        // b. If date in .JSON file: 
        //      Loop thru Dates from date to the Sunday after
        //      Initialize runTime, swimTime, bikeTime, strengthTime, otherTime
        //      For each day
        //          Grab workouts for that day: workouts = jsonarr[JSON.stringify(d.getDay())]
        //          Sum workouts by type: types are run, swim, bike, strength, add to vars runTime, swimTime, bikeTime, strengthTime, and otherTime
        //          Generate a Day component with date=d, workouts = workouts
        //      totalTime = runTime + swimTime + bikeTime + strengthTime + otherTime
        //      Then, generate a Summary component, with totalTime = totalTime, runTime = runTime, bikeTime = bikeTime,  swimTime = swimTime, otherTime = otherTime

    
    // 2. Collect all dates into an array and determine which is the earliest date. Store into earliestDate.
    var dateStrings = Object.keys(data);
    var workoutDates = dateStrings.map( dateString => new Date(dateString));
    var workoutDates = workoutDates.sort(sortDates);
    var earliestDate = new Date(workoutDates[0]);

    // 3. Generate an array of Dates, mondays, which span from earliestDate to 10 weeks from today's date
    var endDate = new Date(addDays(new Date(), 70));
    var mondays = getMondays(endDate, earliestDate);

    var week = [];
    
    return (
    <>
        <div class="calendar">
            {mondays.map(d => {
                d = new Date(d); 

                // a. If date not in .JSON file: 
                
                if (!inDateArr(d, workoutDates)) {
                    
                    // Loop thru Dates from date to the Sunday after (for loop, i < 7, add 1 day each time)
                    for (var i = 0; i < 7; i++) {
                        week.push(new Date(addDays(d, i)));
                    }
                    
                    // For each day, generate a Day component with date=d and workouts=[]
                    // Then, generate Summary component, with totalTime = 0, bikeTime = 0, runTime = 0, swimTime = 0, otherTime = 0
                    return (
                        <div class="week">
                            {week.map( day => (
                                    <Day date={day} workouts={[]} />
                            ))}
                            <Summary workouts={[]} />
                        </div>
                    )

                }

                // b. If date in .JSON file: 
                //      For each day
                //          Generate a Day component with date=d, workouts = workouts
                //      totalTime = runTime + swimTime + bikeTime + strengthTime + otherTime
                //      Then, generate a Summary component, with totalTime = totalTime, runTime = runTime, bikeTime = bikeTime,  swimTime = swimTime, otherTime = otherTime
                else {
                    
                    // Initialize runTime, swimTime, bikeTime, strengthTime, otherTime
                    var runTime = 0, swimTime = 0, bikeTime = 0, strengthTime = 0, otherTime = 0;
                    var key = dateToStr(d);
                    var workouts = [];
                    
                    // Loop thru Dates from date to the Sunday after (for loop, i < 7, add 1 day each time)
                    // Grab workouts for that day: workouts = jsonarr[JSON.stringify(d.getDay())]
                    for (var i = 0; i < 7; i++) {
                        var day = new Date(addDays(d, i));
                        var daysWorkouts = data[key][JSON.stringify(day.getDay())];
                        week.push(day);
                        workouts.push(daysWorkouts);
                    }

                    return(
                        <div class="week">
                            {week.map( day => {
                                <Day date={day} workouts={workouts[day.getDay() - 1]} />
                            })}
                            <Summary workouts={workouts} />
                        </div>
                    )
                }
            })}
        </div>
    </>)
}