import { useIonLoading } from "@ionic/react";
import { useState, useEffect } from "react";
import { getUserInfo, getUserProgress } from "./user.api";



export const useUser = () => {
    const [present, dismiss] = useIonLoading();
    const [user, updateUser] = useState({});
    const [progress, updateProgress] = useState({});

    useEffect(() => {
        present();
        getUserInfo()
        .then(updateUser);
        getUserProgress()
        .then(updateProgress);
        dismiss();
    },[]);

    return {
        user,
        progress
    }
}