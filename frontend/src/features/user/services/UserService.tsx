import {
    handleDeleteUser,
    handleGetAgeByUserId,
    handleGetAllUsers,
    handleGetUserByUsername,
    handleUpdateUser
} from "@/apis/user/userAPI.tsx";
import {UserRequest} from "@/utils/types.tsx";

const getUsers=()=>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return handleGetAllUsers(username!,password!)
        .then((response)=>{
            return response;
        })
}

const updateUser=(id:number,user:UserRequest)=>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return handleUpdateUser(id,user,username!,password!)
        .then((response)=>{
            return response;
        })
}

const getByUsername=()=>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return handleGetUserByUsername(username!,password!)
        .then((response)=>{
            return response;
        })
}

const deleteUser=(id:number)=>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return handleDeleteUser(id,username!,password!)
        .then((response)=>{
            return response;
        })
}

const getAgeByUserId=(id:number)=>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return handleGetAgeByUserId(id,username!,password!)
        .then((response)=>{
            return response;
        })
}
export const UserService={
    getUsers,
    getByUsername,
    updateUser,
    deleteUser,
    getAgeByUserId
}