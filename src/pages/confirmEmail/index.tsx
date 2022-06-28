import './style.css';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonImg, IonText } from '@ionic/react';
import MailSent from '../../assets/images/validate-email.gif'


const ConfirmEmail: React.FC = () => {
    

    return(
        <IonPage>
            <IonContent fullscreen scrollY={false}>
                <IonGrid>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol sizeXl='7' sizeLg='8' sizeMd='10' sizeSm='10' sizeXs='10'>
                            <IonText className='ion-text-wrap page-message-one'>We have sent you an email to validate your account.</IonText>
                        </IonCol>
                        <IonCol sizeXl='7' sizeLg='8' sizeMd='10' sizeSm='10' sizeXs='10'>
                            <IonText className='ion-text-wrap page-message-two'>Please check your mailbox.</IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol sizeXl='8' sizeLg='11' sizeMd='12' sizeSm='12' sizeXs='12'>
                            <IonImg src={MailSent} alt="invtiation-sent-image" className="page-image-validate"></IonImg>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default ConfirmEmail;