import './style.css';
import { Avatars } from '../../../dashboard.model';
import { IonAvatar } from '@ionic/react';


const ConectedUser = ({user, usersConected}:any) => {

    if (usersConected?.some((u: string) => u === user.email)) {
    return (
        <IonAvatar slot="start" className='conected-avatars'>
            <img src={Avatars[user.avatar]} />
        </IonAvatar>
    )
    }else {
        return (
            <IonAvatar className='non-conected-avatars'>
                <img src={Avatars[user.avatar]} />
            </IonAvatar>
        )
    }
}

export default ConectedUser