import { useState, useEffect } from "react";
import { useIonLoading } from "@ionic/react";
import { getNextLessonAPI } from './user.api'


export const useKeyPress = (targetKey:any) => {
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




export const useNextLesson = () => {
  const [present, dismiss] = useIonLoading();
  const [nextLessonData, setNextLessonData] = useState({})
  

  const getNextLesson = async (markDownIdAndEmail:any) => {
    present(); // loading mode on
    const data = await getNextLessonAPI(markDownIdAndEmail); // Call API next lesson function
    console.log('data',data)
    setNextLessonData(data);
    dismiss(); // When API call finishes, loading mode off
    return data;
    
}


  return { getNextLesson, nextLessonData };
}





function setNextLessonData(data: any) {
  throw new Error("Function not implemented.");
}

