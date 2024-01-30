import { capitalize } from "@/utilities"

export default function AddWorkout() {
    return (
        <>
            <input class="workoutTitleInput" placeholder="Workout Title" />
            
            {/* Select type */}
            <b>Type</b>

            

            <b>Duration</b> (minutes): <input placeholder="30"/>
            <textarea class="modifyDescription" placeholder="Workout description" />
            <div class="btnContainer">
                <button class="deleteBtn">Delete</button>
                <button class="saveBtn">Save and Close</button>
            </div>
        </>
    )
}