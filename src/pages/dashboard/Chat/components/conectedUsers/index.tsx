import './style.css';
import { Avatars } from '../../../dashboard.model';
import { IonAvatar } from '@ionic/react';


const ConectedUser = ({user, usersConected, avatar}:any) => {

    if (usersConected?.some((u: any) => u === user)) {
    return (
        <IonAvatar slot="start" className='conected-avatars'>
            <img src={Avatars[avatar]} />
        </IonAvatar>
    )
    }else {
        return (
            <IonAvatar className='non-conected-avatars'>
                <img src={Avatars[avatar]} />
            </IonAvatar>
        )
    }
}

export default ConectedUser