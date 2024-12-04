import {ExerciseRequest} from "@/utils/types.tsx";
import axios from "axios";
import {exercisessUrl} from "@/apis/constants/urlConstants.tsx";
import {secureConfig} from "@/apis/config/apiConfig.tsx";

export const handleAddExercise = (data: ExerciseRequest, username: string, password: string) => {
    return axios.post(`${exercisessUrl}`, data, secureConfig(username, password))
        .then(response => {
            return response.data;
        })
        .catch((err) => {
            console.error('Error adding exercise',err);
            throw err;
        });
}

export const handleDeleteExercise=(idExercise:number,username:string,password:string)=>{
    return axios.delete(`${exercisessUrl}/${idExercise}`,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error deleting exercise',err);
            throw err;
        });
}

export const handleGetExercises=(username:string,password:string)=>{
    return axios.get(`${exercisessUrl}`,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error getting exercises',err);
            throw err;
        });
}