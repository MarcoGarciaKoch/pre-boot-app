import { EarlyStudentRegister } from "./earlyStudentAuth.model";

const generateAuthPostRequest = (student:EarlyStudentRegister) => (
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(student)
    }
)

/**
 * Given a user (email, password)
 */
export const registerAPI = async (student: EarlyStudentRegister) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/early/register-student`, generateAuthPostRequest(student));
}

/**
 * Get all courses from school with a GET request
 *
 */

export const getCoursesAPI = async (email: string ) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/early/get-courses?email=${email}`);
}