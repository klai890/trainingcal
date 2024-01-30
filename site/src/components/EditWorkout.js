import { capitalize } from "@/utilities"

export default function EditWorkout({workout}) {
    return (
        <>
            <input class="workoutTitleInput" value={workout.title} />
            <div>{capitalize(workout.type)}</div>
            <b>Duration</b> (minutes): <input value={workout.duration} />
            
            <br />
            <b>Description:</b>
            <textarea class="modifyDescription" value={workout.description} />

            <div class="btnContainer">
                <button class="deleteBtn">Delete</button>
                <button class="saveBtn">Save and Close</button>
            </div>
        </>
    )
}