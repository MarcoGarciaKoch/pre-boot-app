import { RegisterUser, LoginUser } from "./auth.model";

const generateAuthPostRequest = (user:RegisterUser | LoginUser) => (
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    }
)


// Api call to validate token for early student and add it as a student to the course. It return if the call was ok or not.
export const validateEarlyStudentTokenAPI = async (token:string) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/early-student/validate?token=${token}`);
    return res;
}  

/**
 * Given a user (email, password)
 */
export const registerAPI = async (user: RegisterUser) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, generateAuthPostRequest(user));
}


export const validateTokenAPI = async (token: string) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/validate?token=${token}`)
}


export const loginAPI = async (user: LoginUser) => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, generateAuthPostRequest(user));
    if(!r.ok) throw new Error(r.status.toString());
    return await r.json();
}
