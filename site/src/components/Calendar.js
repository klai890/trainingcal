import data from '../../../data/data.json'
import Day from './Day';
import Summary from './Summary'
import {addDays, sortDates, getMondays, inDateArr, dateToStr} from '@/utilities'

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
    
    // useState to see when to render popup for editing workout, adding workout

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
                    
                    var workouts = data[dateToStr(d)];
                    var keys = Object.keys(workouts);
                    
                    // Loop thru Dates from date to the Sunday after (for loop, i < 7, add 1 day each time)
                    // Grab workouts for that day: workouts = jsonarr[JSON.stringify(d.getDay())]
                    for (var i = 0; i < 7; i++) {
                        var day = new Date(addDays(d, i));
                        week.push(day);
                        var dayStr = JSON.stringify(day.getDay());
                        
                        // Check if day has workouts. If not, set the workouts array to []
                        // for the day.
                        var inKeys = false;
                        for (var j = 0; j < keys.length; j++){
                            if (dayStr == keys[j]) {
                                inKeys = true;
                            }
                        }
                        
                        if (!inKeys) {
                            workouts[dayStr] = [];
                        }
                    }

                    return(
                        <div class="week">
                            {week.map( day => {
                                var dayStr = JSON.stringify(day.getDay());
                                var dayWorkouts = workouts[dayStr];
                                return (
                                    <>
                                        {/* <Day date={day} workouts={workouts[dayStr]} /> */}
                                        <div class="dayHeader">
                                            {day.getDate()}
                                        </div>

                                        <div class="workoutContainer">
                                            {dayWorkouts.map( (workout) => {
                                                return(
                                                    <div class="workout">
                                                        {/* Render appropriate logo based on type */}
                                                    </div>                                        
                                                )
                                            })}
                                            {/* <AddWorkout /> */}
                                        </div>
                                    </>
                                )
                            })}
                            <Summary workouts={workouts} />
                        </div>
                    )
                }
            })}
        </div>
    </>)
}