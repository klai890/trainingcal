"use client";
import data from '../../../data/data.json'
import Summary from './Summary'
import {addDays, sortDates, getMondays, inDateArr, dateToStr, capitalize, prevMon} from '@/utilities'
import { useState, useRef, useEffect } from 'react';
import EditWorkout from './EditWorkout';
import AddWorkout from './AddWorkout';

export default function Calendar(){

    // useState to see when to render popup for editing workout, adding workout
    const [workoutId, setWorkoutId] = useState(-1);
    const [workout, setWorkout] = useState();
    const [addWorkout, setAddWorkout] = useState(false);
    const [date, setDate] = useState(new Date());
    const numWeeks = 20;

    // 2. Collect all dates into an array and determine which is the earliest date. Store into earliestDate.
    var dateStrings = Object.keys(data);
    var workoutDates = dateStrings.map( dateString => new Date(dateString));
    var workoutDates = workoutDates.sort(sortDates);
    var earliestDate = new Date(workoutDates[0]);

    // 3. Generate an array of Dates, mondays, which span from earliestDate to 10 weeks from today's date
    var endDate = new Date(addDays(new Date(), numWeeks * 7));
    var mondays = getMondays(endDate, earliestDate);
    
    // Scroll to Today's Date
    const [today, setToday] = useState(prevMon(new Date()));
    const weekRef = useRef();
    const [selectedDay, setSelectedDay] = useState(new Date());
	
    // Note: [] as a callback forces useEffect() to only run once.
    // To scrollToToday() after the first and only run thru useEffect, click the today button. 
    useEffect(() => {
        scrollToToday();
    }, [])

    function scrollToToday() {
        if (weekRef.current != null){
            weekRef.current.scrollIntoView();
        }
    }
   
    return (
        <>
        <div id="main">

            <div id="header">
	    	{selectedDay.getMonth() + 1} / {selectedDay.getFullYear()}
                <button id="todayBtn" onClick={() => scrollToToday()} >Today</button>
                <div id="weekHeader">
                    <div class="dayName dayWidth">MON</div>
                    <div class="dayName dayWidth">TUE</div>
                    <div class="dayName dayWidth">WED</div>
                    <div class="dayName dayWidth">THU</div>
                    <div class="dayName dayWidth">FRI</div>
                    <div class="dayName dayWidth">SAT</div>
                    <div class="dayName dayWidth">SUN</div>
                    <div class="dayName summaryWidth">SUMMARY</div>
                 </div>
            </div>
        </div>

        {workoutId != -1 ? (
            // Edit workout
            <div id="editWorkout">
                <EditWorkout workout={workout}/>

                {/* Exit Button */}
                <button onClick={() => setWorkoutId(-1)} class="exitBtn">X</button>
            </div>
        ) : addWorkout ? (
            <>
                <div id="editWorkout">
                    <AddWorkout date={date} />
                    {/* Exit Button */}
                    <button onClick={() => setAddWorkout(false)} class="exitBtn">X</button>
                </div>
            </>
        ) 
        :(
        <div class="calendar">
            {mondays.map(d => {
                d = new Date(d); 
                
                var week = [];

                // Loop thru Dates from date to the Sunday after (for loop, i < 7, add 1 day each time)
                for (var i = 0; i < 7; i++) {
                    week.push(new Date(addDays(d, i)));
                }

                // a. If date not in .JSON file: 
                if (!inDateArr(d, workoutDates)) {
                    
                    // For each day, generate a Day component with date=d and workouts=[]
                    // Then, generate Summary component, with totalTime = 0, bikeTime = 0, runTime = 0, swimTime = 0, otherTime = 0

                    var rf = dateToStr(d) == dateToStr(today) ? weekRef : null;

                    return (
                        <div class="week" key={d.getTime()} id={d.getTime()} ref={rf}>
                            {week.map( day => (
                                    <div class="dayContainer" id={day.getTime()} key={day.getTime()} onClick={() => setSelectedDay(day)}>
                                        <div class="dayHeader">
                                            {day.getDate()}
                                        </div>

                                        <div class="workoutContainer">
                                            <button onClick={() => {setAddWorkout(true); setDate(day)}} id="addWorkoutBtn">Add Workout</button>
                                        </div>
                                    </div>
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

                    var rf = dateToStr(d) == dateToStr(today) ? weekRef : null;

                    return(
                        <div class="week" key={d.getTime()} id={d.getTime()} ref={rf}>
                            {week.map( day => {
                                var dayStr = JSON.stringify(day.getDay());
                                var dayWorkouts = workouts[dayStr];

                                return (
                                    <>
                                        <div class="dayContainer" key={day.getTime()} id={day.getTime()} onClick={() => {setSelectedDay(day)}} >
                                            <div class="dayHeader">
                                                {day.getDate()}
                                            </div>
                                           
                                            <div class="workoutContainer">
                                                {/* Should be able to edit title/description/time and delete each workout */}
                                                {/* On click on workout class, should show EditWorkout component w correct data */}

                                                {/* each workout has an ID, add it to the div.workout */}
                                                {/* <EditWorkout {id, isNew} /> where isNew is true if we are adding a workout */}
                                                {/* If adding a new workout, id = -1; if not, id = workout.id */}
                                                {/* EditWorkout will then retrieve the data for that particular workout and display it. */}
                                                {dayWorkouts.map( (workout) => {
                                                    return(
                                                        <div class="workout" key={workout.id} onClick={() => {setWorkoutId(workout.id); setWorkout(workout)}} >
                                                            <p class="workoutTitle">{workout.title}</p>
                                                            <p class="workoutDuration"> {capitalize(workout.type)} / {workout.duration}</p>
                                                            <p class="workoutDescription">{workout.description}</p>
                                                        </div>                                        
                                                    )
                                                })}

                                                <button onClick={() => {setAddWorkout(true); setDate(day)}} id="addWorkoutBtn">Add Workout</button>
                                            </div>

                                        </div>

                                    </>
                                )
                            })}
                            <Summary workouts={workouts} />
                        </div>
                    )
                }
            })}
        </div>)}
    </>)
}
