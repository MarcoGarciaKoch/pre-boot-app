import { registerAPI, getCoursesAPI } from "./earlyStudentAuth.api";
import { EarlyStudentRegister } from "./earlyStudentAuth.model";
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


export const useEarlyStudentAuth = () => {
    // If there is no data on session storage when logging in, 
    // we won´t be able to navigate and will be redirected to login page
    // isAuth useState from default won´t have any data at sessionStorage,
    // until we effectively initiate a session and save access token on it.
    const [present, dismiss] = useIonLoading();

    const register = async (student: EarlyStudentRegister) => {
        present(); // loading mode on
        await registerAPI(student); // Call API register function
        dismiss(); // When API call finishes, loading mode off
    }

    const getCourses = async (email:string) => {
        present(); // loading mode on
        const res = await getCoursesAPI(email); // Call API getCourses function
        dismiss(); // When API call finishes, loading mode off
        return res.json()
    }

    return {
        register,
        getCourses
    }

}


export const useQuery = () => {
    const { search } = useLocation();
    return new URLSearchParams(search);
}