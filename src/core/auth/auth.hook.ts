import { registerAPI, loginAPI, validateTokenAPI, validateEarlyStudentTokenAPI } from "./auth.api";
import { useState } from "react";
import { AUTH_STORAGE_KEY } from "./auth.utils";
import { RegisterUser, LoginUser } from "./auth.model";
import { useIonLoading } from "@ionic/react";
import { useLocation } from "react-router-dom";

/**
 * In charge of whole authentication management
 *  - It exposes the Auth functions
 *  - It exposes both the token and its saving process (JWT)
 * 
 * Waht do I want to return?
 *      - If we are logged in or not
 *      - If we are loading or not
 *      - Register function 
 *      - Login function
 *      - Validate function
 */


export const useAuth = () => {
    // If there is no data on session storage when logging in, 
    // we won´t be able to navigate and will be redirected to login page
    // isAuth useState from default won´t have any data at sessionStorage,
    // until we effectively initiate a session and save access token on it.
    const [isAuth, updateIsAuth] = useState(sessionStorage.getItem(AUTH_STORAGE_KEY) !== null);
    const [present, dismiss] = useIonLoading();
    const [accountValidated, updateAccountValidated] = useState(false);


    const validateEarlyStudent = async (token:string) => {
        present(); // loading mode on
        const res = await validateEarlyStudentTokenAPI(token);
        dismiss(); // loading mode off
        return res.json();
    }

    const register = async (user: RegisterUser) => {
        present(); // loading mode on
        await registerAPI(user); // Call API register function
        dismiss(); // When API call finishes, loading mode off
    }

    const validate = async (token: string) => {
        present();// loading mode on
        const res = await validateTokenAPI(token);
        res.ok ? updateAccountValidated(true) : updateAccountValidated(false); 
        dismiss(); // When API call finishes, loading mode off
    }
    
    const login = async (user: LoginUser) => {
        present(); // loading mode on
        const token = await loginAPI(user); // Call API login function
        updateIsAuth(true);
        sessionStorage.setItem(AUTH_STORAGE_KEY, token.access_token);
        dismiss(); // When API call finishes, loading mode off
     }

    return {
        isAuth,
        validateEarlyStudent,
        register,
        login,
        validate,
        accountValidated,
    }

}


export const useQuery = () => {
    const { search } = useLocation();
    return new URLSearchParams(search);
}
