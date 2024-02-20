import { capitalize, createWorkout } from "@/utilities"
import { useState } from "react";

export default function AddWorkout({date}) {
    var workoutTypes = ['run', 'ride', 'swim', 'strength', 'other'];

    const [workoutType, setWorkoutType] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(30);

    return (
        <>
            <input class="workoutTitleInput" placeholder="Workout Title" onChange={(e) => setTitle(e.target.value)} />
            
            {/* Select type */}
            <b>Type</b>
            <select class="typeContainer" id="workoutTypeSelector">
                <option onClick={() => setWorkoutType('swim')}>Swim</option>
                <option onClick={() => setWorkoutType('ride')}>Ride</option>
                <option onClick={() => setWorkoutType('run')}>Run</option>
                <option onClick={() => setWorkoutType('strength')}>Strength</option>
                <option onClick={() => setWorkoutType('other')}>Other</option>
            </select>
            <b>Duration</b> (minutes): <input placeholder="30" onChange={(e) => setDuration(e.target.value)}/>
            <textarea class="modifyDescription" placeholder="Workout description" onChange={e => setDescription(e.target.value)} />
            <div id="btnContainer">
                <button class="saveBtn" onClick={() => {createWorkout(document.getElementById('workoutTypeSelector').value, title, duration, description, date); alert("Workout successfully added");}}>Save and Close</button>
            </div>
        </>
    )
}
