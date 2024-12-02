import axios from 'axios';
import {usersUrl, workoutsUrl} from "@/apis/constants/urlConstants.tsx";
import {secureConfig} from "@/apis/config/apiConfig.tsx";
import {WorkoutRequest} from "@/utils/types.tsx";

export const handleGetWorkouts = (username: string, password: string ) => {
    return axios.get(`${workoutsUrl}`, secureConfig(username, password))
    .then(response =>{
        return response.data;
    })
    .catch((err) => {
        console.error('Error getting workouts',err);
        throw err;
    });
}

export const handleAddWorkout = (data: WorkoutRequest, username: string, password: string) => {
    return axios.post(`${workoutsUrl}`, data, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error adding workout',err);
        throw err;
    });
}

export const handleDeleteWorkout = (id: number, username: string, password: string) => {
    return axios.delete(`${workoutsUrl}/${id}`, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error deleting workout',err);
        throw err;
    });
}

export const handleUpdateWorkout = (id: number, data: WorkoutRequest, username: string, password: string) => {
    return axios.put(`${workoutsUrl}/${id}`, data, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error updating workout',err);
        throw err;
    });
}

export const handleGetWorkout = (id: number, username: string, password: string) => {
    return axios.get(`${workoutsUrl}/${id}`, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error getting workout',err);
        throw err;
    });
}

export const handleWorkoutsByUsername=(username:string,password:string)=>{
    return axios.get(`${usersUrl}/workouts/${username}`,secureConfig(username,password))
    .then(response=>{
        return response.data;
    })
    .catch((err)=>{
        console.error('Error getting workouts by username',err);
        throw err;
    });
}

export const handleGetCaloriesBurnedByDatesByUsername = (startDate: string, endDate: string, username: string, password: string) => {
    return axios.get(`${usersUrl}/caloriesByDates/${username}`, {
        ...secureConfig(username, password),
        params: { startDate, endDate }
    })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.error('Error getting calories filtered by date by username:', err);
            throw err;
        });
};