import './style.css';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonTitle, IonImg, IonButton } from '@ionic/react';
import MailSent from '../../assets/images/invitation-sent.png'


const ConfirmEmail: React.FC = () => {
    

    return(
        <IonPage>
            <IonContent fullscreen scrollY={false}>
                <IonGrid>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='8'>
                            <IonTitle className='page-message'>We have sent you an email to validate your account. Please check your mailbox</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='11'>
                            <IonImg src={MailSent} alt="invtiation-sent-image" className="page-image"></IonImg>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default ConfirmEmail;