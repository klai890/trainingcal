import {numHours, remainingMins} from '../utilities';

export default function Summary(workouts){

    function formatTime(duration){
        var hours = numHours(duration);
        var mins = remainingMins(duration);
        return hours + ":" + mins;
    }

    // 1. Calculate total durations by type of workout
    workouts = workouts['workouts']
    var swimTime = 0, runTime = 0, bikeTime = 0, strengthTime = 0, otherTime = 0;
    for (var day in workouts){
        var daysWorkouts = workouts[day];

        for (var i = 0; i < daysWorkouts.length; i++){
            var workout = daysWorkouts[i];
            switch (daysWorkouts[i].type) {
                case 'run': 
                    runTime += workout.duration;
                    break;
                case 'swim':
                    swimTime += workout.duration;
                    break;
                case 'ride':
                    bikeTime += workout.duration;
                    break;
                case 'strength': 
                    strengthTime += workout.duration;
                    break;
                case 'other':
                    otherTime += workout.duration;
                    break;
                default:
                    otherTime += workout.duration;
                    break;
            }
        }
    }
    
    var totalTime = runTime + bikeTime + swimTime + strengthTime + otherTime;

    return (
        <div class="summary">
            <div class="duration">
                <p>Total Duration</p>
                <p>{formatTime(totalTime)}</p>
            </div>

            <div class="duration">
                <p>Swim Duration</p>
                <p>{formatTime(swimTime)}</p>
            </div>
            <div class="duration">
                <p>Bike Duration</p>
                <p>{formatTime(bikeTime)}</p>
            </div>
            <div class="duration">
                <p>Run Duration</p>
                <p>{formatTime(runTime)}</p>
            </div>
            <div class="duration">
                <p>Strength Duration</p>
                <p>{formatTime(strengthTime)}</p>
            </div>
            <div class="duration">
                <p>Other Duration</p>
                <p>{formatTime(otherTime)}</p>
            </div>

        </div>
    )
}