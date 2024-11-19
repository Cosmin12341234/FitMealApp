import axios from 'axios';
import {LoginRequest,User} from "../../utils/types.tsx";
import {loginUrl,signupUrl} from "../urlConstants.tsx";
import {secureConfig,config} from "../config/apiConfig.tsx";

export const handleSignup = (user: User) => {
    return axios.post(`${signupUrl}`, user, config);
}

export const handleLogin = (request: LoginRequest) => {
    return axios.get(`${loginUrl}`, secureConfig(request.username, request.password));
}