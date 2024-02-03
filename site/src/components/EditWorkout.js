import { capitalize } from "@/utilities"
import { deleteWorkout, modifyWorkout } from '@/utilities'
import { useState } from "react";

export default function EditWorkout({workout}) {

    const [title, setTitle] = useState(workout.title);
    const [duration, setDuration] = useState(workout.duration);
    const [description, setDescription] = useState(workout.description)

    return (
        <>
            <input class="workoutTitleInput" value={workout.title} onChange={(e)=> setTitle(e.target.value)} />
            <div>{capitalize(workout.type)}</div>
            <b>Duration</b> (minutes): <input value={workout.duration} onChange={(e) => setDuration(e.target.value)} />
            
            <br />
            <b>Description:</b>
            <textarea class="modifyDescription" value={workout.description} onChange={(e) => setDescription(e.target.value)} />

            <div id="btnContainer">
                <button class="deleteBtn" onClick={()=>{deleteWorkout(workout.id)}}>Delete</button>
                <button class="saveBtn" onClick={() => {modifyWorkout(title, duration, description, workout.id)}}>Save and Close</button>
            </div>
        </>
    )
}