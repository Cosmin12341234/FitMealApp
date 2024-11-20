import axios from 'axios';
import {LoginRequest, UserRequest} from "../../utils/types.tsx";
import {loginUrl,signupUrl} from "../urlConstants.tsx";
import {secureConfig,config} from "../config/apiConfig.tsx";

export const handleSignup = (user: UserRequest) => {
    return axios.post(`${signupUrl}`, user, config);
}

export const handleLogin = (request: LoginRequest) => {
    return axios.get(`${loginUrl}`, secureConfig(request.username, request.password));
}