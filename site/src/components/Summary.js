
export default function Summary(workouts){

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
                case 'bike':
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
            <p>Total Duration {totalTime}</p>
            <p>Swim Duration {swimTime}</p>
            <p>Bike Duration {bikeTime}</p>
            <p>Run Duration {runTime}</p>
            <p>Strength Duration {strengthTime}</p>
            <p>Other Duration {otherTime}</p>
        </div>
    )
}