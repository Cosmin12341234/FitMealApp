import {MealRequest} from "@/utils/types.tsx";
import axios from "axios";
import {mealsUrl, usersUrl} from "@/apis/constants/urlConstants.tsx";
import {secureConfig} from "@/apis/config/apiConfig.tsx";

export const handleAddMeal = (data: MealRequest, username: string, password: string) => {
    return axios.post(`${mealsUrl}`, data, secureConfig(username, password))
    .then(response => {
        return response.data;
    })
    .catch((err) => {
        console.error('Error adding meal',err);
        throw err;
    });
}

export const handleDeleteMeal=(idMeal:number,username:string,password:string)=>{
    return axios.delete(`${mealsUrl}/${idMeal}`,secureConfig(username,password))
    .then(response=>{
        return response.data;
    })
    .catch((err)=>{
        console.error('Error deleting meal',err);
        throw err;
    });
}

export const handleUpdateMeal=(idMeal:number,data:MealRequest,username:string,password:string)=>{
    return axios.put(`${mealsUrl}/${idMeal}`,data,secureConfig(username,password))
    .then(response=>{
        return response.data;
    })
    .catch((err)=>{
        console.error('Error updating meal',err);
        throw err;
    });
}

export const handleGetMeals=(username:string,password:string)=>{
    return axios.get(`${mealsUrl}`,secureConfig(username,password))
    .then(response=>{
        return response.data;
    })
    .catch((err)=>{
        console.error('Error getting meals',err);
        throw err;
    });
}

export const handleGetMealById=(idMeal:number,username:string,password:string)=>{
    return axios.get(`${mealsUrl}/${idMeal}`,secureConfig(username,password))
    .then(response=>{
        return response.data;
    })
    .catch((err)=>{
        console.error('Error getting meal',err);
        throw err;
    });
}

export const handleGetMealsByUsername=(username:string,password:string)=>{
    return axios.get(`${usersUrl}/meals/${username}`,secureConfig(username,password))
    .then(response=>{
        return response.data;
    })
    .catch((err)=>{
        console.error('Error getting meals',err);
        throw err;
    });
}

export const handleGetCaloriesByDateByUsername=(date:string,username:string,password:string)=>{
    return axios.get(`${usersUrl}/caloriesConsumed/${username}`,{
        ...secureConfig(username,password),
        params:{date}
    })
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error getting calories',err);
            throw err;
        });
}

type CaloriesMap = {
    [date: string]: number
}

export const handleGetCaloriesConsumedByDatesByUsername = (
    startDate: string,
    endDate: string,
    username: string,
    password: string
): Promise<CaloriesMap> => {
    return axios.get(`${usersUrl}/caloriesConsumedByDates/${username}`, {
        ...secureConfig(username, password),
        params: { startDate, endDate }
    })
        .then(response => response.data)
        .catch(err => {
            console.error('Error getting calories filtered by date by username:', err);
            throw err;
        });
};