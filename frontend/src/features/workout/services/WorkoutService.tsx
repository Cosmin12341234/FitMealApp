import {
    handleAddWorkout,
    handleDeleteWorkout, handleGetWorkout,
    handleGetWorkouts,
    handleUpdateWorkout, handleWorkoutsByUsername
} from "@/apis/workout/workoutAPI.tsx";
import {WorkoutRequest} from "@/utils/types.tsx";

const getWorkouts=()=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetWorkouts(username!,password!)
        .then((response)=>{
            return response;
        })
};

const addWorkout=(workout:WorkoutRequest)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleAddWorkout(workout,username!,password!)
        .then((response)=>{
            return response;
        })
}

const deleteWorkout=(id:number)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleDeleteWorkout(id,username!,password!)
        .then((response)=>{
            return response;
        })
}

const updateWorkout=(id:number,workout:WorkoutRequest)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleUpdateWorkout(id,workout,username!,password!)
        .then((response)=>{
            return response;
        })
}

const getWorkout=(id:number)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetWorkout(id,username!,password!)
        .then((response)=>{
            return response;
        })
}

const getWorkoutsByUsername=()=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleWorkoutsByUsername(username!,password!)
        .then((response)=>{
            return response;
        })
}

export const WorkoutService={
    getWorkouts,
    addWorkout,
    deleteWorkout,
    updateWorkout,
    getWorkout,
    getWorkoutsByUsername
}