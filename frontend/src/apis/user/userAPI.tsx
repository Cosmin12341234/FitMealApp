import axios from "axios";
import {usersUrl} from "@/apis/constants/urlConstants.tsx";
import {secureConfig} from "@/apis/config/apiConfig.tsx";
import {UserRequest} from "@/utils/types.tsx";

export const handleGetUserByUsername=(username:string,password:string)=>{
    return axios.get(`${usersUrl}/byUsername/${username}`,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error getting user',err);
            throw err;
        });
}

export const handleDeleteUser=(id:number,username:string,password:string)=>{
    return axios.delete(`${usersUrl}/${id}`,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error deleting user',err);
            throw err;
        });
}

export const handleUpdateUser=(id:number,data:UserRequest,username:string,password:string)=>{
    return axios.put(`${usersUrl}/${id}`,data,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error updating user',err);
            throw err;
        });
}

export const handleGetAllUsers=(username:string,password:string)=>{
    return axios.get(`${usersUrl}`,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error getting users',err);
            throw err;
        });
}

export const handleGetAgeByUserId=(id:number,username:string,password:string)=>{
    return axios.get(`${usersUrl}/ageById/${id}`,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error getting age',err);
            throw err;
        });
}

export const handleGetTDEEByUsername=(username:string,password:string)=>{
    return axios.get(`${usersUrl}/calories/${username}`,secureConfig(username,password))
        .then(response=>{
            return response.data;
        })
        .catch((err)=>{
            console.error('Error getting tdee',err);
            throw err;
        });
}