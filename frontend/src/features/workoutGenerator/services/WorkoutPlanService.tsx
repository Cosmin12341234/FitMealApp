import { WorkoutPlanRequest} from "@/utils/types.tsx";
import {
    handleDeleteWorkoutPlan,
    handleGenerateWorkoutPlan,
    handleGetWorkoutPlanByUsername
} from "@/apis/workoutPlan/workoutPlanAPI.tsx";

const generateWorkoutPlan=(workoutPlan:WorkoutPlanRequest)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGenerateWorkoutPlan(workoutPlan,username!,password!)
        .then((response)=>{return response;
        })
}

const deleteWorkoutPlan=(id:number)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleDeleteWorkoutPlan(id,username!,password!)
        .then((response)=>{return response;
        })
}

const getWorkoutPlanByUsername=()=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetWorkoutPlanByUsername(username!,password!)
        .then((response)=>{return response;
        })
}

export {
    generateWorkoutPlan,
    deleteWorkoutPlan,
    getWorkoutPlanByUsername
}