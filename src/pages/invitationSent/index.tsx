import './style.css';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonTitle, IonImg, IonButton } from '@ionic/react';
import MailSent from '../../assets/images/invitation-sent.png'


const InvitationSent: React.FC = () => {
    

    return(
        <IonPage>
            <IonContent fullscreen scrollY={false}>
                <IonGrid>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='8'>
                            <IonTitle className='page-message'>Congrats!! Your student has been succesfully registered</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='11'>
                            <IonImg src={MailSent} alt="invtiation-sent-image" className="page-image"></IonImg>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='3'>
                            <IonButton>GO BACK TO DASHBOARD</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default InvitationSent;