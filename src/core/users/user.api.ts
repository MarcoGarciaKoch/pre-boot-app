import { wrapUsingAuth } from "../auth/auth.utils";

const generateAuthRequest = (markDownIdAndEmail:any, methodType:string) => (
    {
        method: methodType,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(markDownIdAndEmail)
    }
)


export const getUserCourseInfo = async () => {
   return await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/info`, wrapUsingAuth());
    // console.log(r);
    // return await r.json();
}



export const getNextLessonAPI = async (markDownIdAndEmail:any) => {
    const options = generateAuthRequest(markDownIdAndEmail, 'PATCH')
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/nextLesson`, wrapUsingAuth(options))
    return await r.json();
}
