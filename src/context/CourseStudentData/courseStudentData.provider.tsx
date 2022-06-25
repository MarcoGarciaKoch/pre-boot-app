import { CourseStudentDataContext } from "./courseStudentData.context";
import { useIonLoading } from "@ionic/react";
import { getUserCourseInfo } from '../../core/users/user.api';
import { useState, useEffect } from "react";


function CourseStudentDataProvider ({children}:any) {
    const [present, dismiss] = useIonLoading();
    const [userCourseData, updateUserCourseData]:any = useState({course: {schoolID:'', lessons:[{id:'',order:0,tests:'',title:''}],students:[], chat:{usersConected:[], messages:[]}}, 
                                                             student: {bootcamp:'', course:{idCourse:'',order:0,progress:''},
                                                             email:'',lastname:'',name:'',role:''}});

    useEffect(() => {
        present();
        getUserCourseInfo()
        .then(d => d.json())
        .then(r => {
            updateUserCourseData(r);
            dismiss();
        })
    },[]);
    

    return (
        <CourseStudentDataContext.Provider value={{userCourseData, updateUserCourseData}}>
            {children}
        </CourseStudentDataContext.Provider>
    )
}

export default CourseStudentDataProvider;