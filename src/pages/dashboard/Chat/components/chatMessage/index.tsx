import { IonItem, IonAvatar, IonLabel, useIonViewWillEnter, IonText } from '@ionic/react';
import './style.css';
import { useState } from 'react';
import { Avatars } from '../../../dashboard.model';


const ChatMessage:any = ({message, userCourseData, students}:any) => {
    const [messageToPrint, setMessageToPrint] = useState({} ?? '')
    const student = students.find((u:any) => u.email===message.userEmail) ?? {};
    useIonViewWillEnter(() =>{
        setMessageToPrint(message)
    },[message])
    
        if((message.userEmail !== userCourseData.student.email) && message.type === 'superchat') {
            return (
            <IonItem slot="start" color='light' className='others-message-item'>
                <IonAvatar slot="start" className='others-message-avatar'>
                    <img src={Avatars[student.avatar]} />
                </IonAvatar>
                <IonLabel slot='end'>
                    <IonLabel className='ion-text-wrap others-message-name'>{`${student.name} ${student.lastname}`}</IonLabel>
                    <IonText className='ion-text-wrap others-message-text'>{message.message}</IonText>
                </IonLabel>
            </IonItem>
            )
        }else if ((message.userEmail === userCourseData.student.email) && message.type === 'superchat') {
            return (
                <IonItem slot="end" color='primary' className='message-item'>
                    <IonLabel>
                        <IonLabel className='ion-text-wrap message-name'>{`${userCourseData.student.name} ${userCourseData.student.lastname}`}</IonLabel>
                        <IonText className='ion-text-wrap message-text'>{message.message}</IonText>
                    </IonLabel>
                    <IonAvatar slot='end' className='message-avatar'>
                        <img src={Avatars[userCourseData.student.avatar]} />
                    </IonAvatar>
                </IonItem>
            )
        }else if(message.type === 'coding') {
            return (
                <IonItem lines='none' slot="start" color='success' className='coding-message-item'>
                    <IonLabel color="light" className='ion-text-wrap coding-message'>{message.message}</IonLabel>
                </IonItem>
            )
        }
}


export default ChatMessage;