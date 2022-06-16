import { wrapUsingAuth } from "../auth/auth.utils";


export const getUserInfo = async () => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/info` /*,wrapUsingAuth()*/);
    return await r.json();
}

export const getUserProgress = async () => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/courses`/*,wrapUsingAuth()*/);
    return await r.json();
}
