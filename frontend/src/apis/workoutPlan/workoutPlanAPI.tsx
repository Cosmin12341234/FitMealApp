import axios from "axios";
import {WorkoutPlanRequest} from "@/utils/types.tsx";
import {secureConfig} from "@/apis/config/apiConfig.tsx";
import {usersUrl, workoutPlansUrl} from "@/apis/constants/urlConstants.tsx";

export const handleGenerateWorkoutPlan = (data: WorkoutPlanRequest, username: string, password: string) => {
    return axios.post(`${workoutPlansUrl}`, data, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error generating workout plan',err);
        throw err;
    });
}

export const handleDeleteWorkoutPlan = (id: number, username: string, password: string) => {
    return axios.delete(`${workoutPlansUrl}/${id}`, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error deleting workout plan',err);
        throw err;
    });
}

export const handleGetWorkoutPlanByUsername = (username: string, password: string) => {
    return axios.get(`${usersUrl}/plans/${username}`, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error getting workout plan',err);
        throw err;
    });
}