import './style.css';
import { IonAvatar,  } from '@ionic/react';
import UserAvatar from '../../../assets/images/avatar-bigote-chino.png';


const ConectedUser = ({user, usersConected}:any) => {
    // console.log(usersConected)
    return (

        <IonAvatar slot="start" className='avatar-style non-conected-avatars conected-avatars'>
            <img src={UserAvatar} />
        </IonAvatar>
    )
}

export default ConectedUser