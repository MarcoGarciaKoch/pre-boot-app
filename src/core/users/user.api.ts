import { wrapUsingAuth } from "../auth/auth.utils";


export const getUserCourseInfo = async () => {
   return await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/info`, wrapUsingAuth());
    // console.log(r);
    // return await r.json();
}
