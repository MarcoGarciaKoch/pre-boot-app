import { useIonLoading } from "@ionic/react";
import { useState, useEffect } from "react";
import { getUserCourseInfo } from "./user.api";


export const useUser = () => {
    const [present, dismiss] = useIonLoading();
    const [userCourseData, updateUserCourseData] = useState({course: {lessons:[{id:'',order:0,tests:'',title:''}],students:[]}, 
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

    return {
        userCourseData
    }
}



const useKeyPress = function (targetKey:any) {
    const [keyPressed, setKeyPressed] = useState(false);
  
    function downHandler({ key }:any) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
  
    const upHandler = ({ key }:any) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("keydown", downHandler);
      document.addEventListener("keyup", upHandler);
  
      return () => {
        document.removeEventListener("keydown", downHandler);
        document.removeEventListener("keyup", upHandler);
      };
    });
  
    return keyPressed;
  };
  
export default useKeyPress;

