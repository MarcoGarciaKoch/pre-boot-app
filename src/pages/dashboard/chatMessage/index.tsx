import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import './style.css';
import UserAvatar from '../../../assets/images/avatar-bigote-chino.png';
import Barbudo from '../../../assets/images/barbudo-avatar.png';
import Trenzas from '../../../assets/images/trenzas-avatar.png';
import Miyagi from '../../../assets/images/miyagi-avatar.png';
import Chica from '../../../assets/images/chica-avatar.png';
import Nido from '../../../assets/images/nido-avatar.png';

const ChatMessage = ({message, userCourseData}:any) => {

    console.log(message)
    return (
        <IonItem className={`message-item ${message.ownedByCurrentUser ? "ion-justify-content-end" : "ion-justify-content-start"}`}>
            <IonAvatar slot="start">
                <img src={UserAvatar} />
            </IonAvatar>
            <IonLabel>
                <h2>{`${userCourseData.student.name} ${userCourseData.student.lastname}`}</h2>
                <h3>{message.body}</h3>
            </IonLabel>
        </IonItem>
    )

}


export default ChatMessage;